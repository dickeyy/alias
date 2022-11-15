import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, set, get, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"
import { app } from './app.js'

// firebase stuff
const db = getFirestore(app)
const rdb = getDatabase(app)
const auth = getAuth(app)
const analytics = getAnalytics(app)

// File name stuff
const filePath = window.location.pathname;
const fileExtension = filePath.split("/").pop();
const pageName = fileExtension.split('.')[0]

// Sign in
const nameElem = document.getElementById('userName')
onAuthStateChanged(auth, (user) => {
    if (pageName == 'playing') {
        document.getElementById('gSignInWrapper').style.display = 'none'
        document.getElementById('pencil').style.display = 'none'
    }

    if (user == null) {
        // Automatically sign in as anonymous
        signInAnonymously(auth).then(() => {
            const cUser = auth.currentUser
            getDoc(doc(db, 'users', cUser.uid)).then((uData) => {
                if (uData.exists()) {
                    const username = uData.data()['username']
                    nameElem.innerHTML = username
                } else {
                    nameElem.innerHTML = 'Guest'
                    return setDoc(doc(db, 'users', cUser.uid), {
                        username: 'Guest',
                    }). then(() => {
                        console.log('Logged in')
                    })
                }
            })
        })
    } if (user.isAnonymous && user != null) {
        if (pageName != 'playing') {
            document.getElementById('gSignInWrapper').style.display = 'block'
            document.getElementById('pencil').style.display = 'none'
            nameElem.innerHTML = 'Guest'
        }
    } if (!user.isAnonymous) {
        if (pageName != 'playing') {
            document.getElementById('pencil').style.display = 'inline'
            document.getElementById('gSignInWrapper').style.display = 'none'
        } else {
            document.getElementById('pencil').style.display = 'none'
            document.getElementById('gSignInWrapper').style.display = 'none'
        }
    } if (user != null && !user.isAnonymous) {
        if (pageName != 'playing') {
            getDoc(doc(db, 'users', user.uid)).then((uData) => {
                if (uData.exists()) {
                    const username = uData.data()['username']
                    nameElem.innerHTML = username
                } else {
                    setDoc(doc(db, 'users', user.uid), {
                        username: 'Guest'
                    })
                }
            })
        }
    }
})

// google sign in
const gProvider = new GoogleAuthProvider()
const googleBtn = document.getElementById('googleBtn')

googleBtn.onclick = function(e) {
    signInWithPopup(auth, gProvider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user

        getDoc(doc(db, 'users', user.uid)).then((uData) => {
            if (uData.exists()) {
                const username = uData.data()['username']
                nameElem.innerHTML = username
            }
        })
    })
}

// Edit name 
const pencil = document.getElementById('pencil')
const nameForm = document.querySelector('#usernameForm')
pencil.onclick = function(e) {
    if (nameForm.style.display == 'none') {
        nameForm.style.display = 'block'
    } else {
        nameForm.style.display = 'none'
    }
}

nameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const cUser = auth.currentUser
    const newName = nameForm['username'].value

    updateDoc(doc(db, 'users', cUser.uid), {
        username: newName
    }). then(() => {
        nameElem.innerHTML = newName
        nameForm.reset()
        nameForm.style.display = 'none'
    })
})

// create / join game
if (pageName == 'play') {
    const createGameBtn = document.getElementById('createGame')
    const joinGameForm = document.querySelector('#joinGameForm')

    // Create Game
    createGameBtn.onclick = function(e) {
        const gameId = Math.floor(Math.random() * 1000000000)
        const cUser = auth.currentUser

        set(ref(rdb, 'games/' + gameId), {
            isStarted: false,
            isActive: true,
            lobbyActive: true,
            playerCount: 1,
            playerUids: [cUser.uid],
            ownerUid: cUser.uid,
            redirectPlayers: false,
            aliases: []
        }).then(() => {
            setDoc(doc(db, 'games', `${gameId}`), {
                isActive: true,
                lobbyActive: true,
                ownerUid: cUser.uid
            }).then(() => {
                window.location.replace(`waiting.html?code=${gameId}`)
            })
        })
    }

    // Join Game
    joinGameForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const enteredId = joinGameForm['gameCode'].value 
        const cUser = auth.currentUser
        const cUid = cUser.uid

        getDoc(doc(db, 'games', enteredId)).then(data => {
            if (!data.exists()) {
                alert('Invalid Game Code');
            } else {
                get(ref(rdb, 'games/' + enteredId + '/isActive')).then((data) => {
                    if (!data.val()) {
                        alert('That game is no longer active')
                    } else {
                        get(ref(rdb, 'games/' + enteredId + '/playerCount')).then((data) => {

                            var playerCountBefore = data.val()
                            playerCountBefore ++ 
                            console.log(playerCountBefore)

                            get(ref(rdb, 'games/' + enteredId + '/playerUids')).then((data) => {
                                var uids = data.val()
                                uids.push(cUser.uid)
                                get(ref(rdb, 'games/' + enteredId + '/aliases')).then((data) => {
                                    var aliases = data.val()
                                    
                                    if (aliases == null) {
                                        const updates = {}
                                        updates['games/' + enteredId + '/playerCount'] = playerCountBefore
                                        updates['games/' + enteredId + '/playerUids'] = uids
                                        return update(ref(rdb), updates)
                                    } else {
                                        const updates = {}
                                        updates['games/' + enteredId + '/playerCount'] = playerCountBefore
                                        updates['games/' + enteredId + '/playerUids'] = uids
                                        return update(ref(rdb), updates)
                                    }
                                }).then(() => {
                                    window.location.replace(`waiting.html?code=${enteredId}`)
                                })
                            })
                        })
                    }
                })
            }
        })
    })
}

// Waiting to start
if (pageName == 'waiting') {
    var params = new URLSearchParams(window.location.search);
    const gameCode = params.get('code')
    document.getElementById('code').innerHTML = gameCode

    const qrCode = document.getElementById('qrcode')
    const startBtn = document.getElementById('startGame')
    const endGameBtn = document.getElementById('endGame')
    const aliasForm = document.querySelector('#aliasFormOwner')
    aliasForm.style.display = 'inline'

    get(ref(rdb, 'games/' + gameCode + '/ownerUid')).then((data) => {
        const ownerUid = data.val()

        if (auth.currentUser.uid == ownerUid) {
            startBtn.style.display = 'inline'
            endGameBtn.style.display = 'inline'
        }

        qrCode.style.display = 'inline'
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x2000&data=https://aliasgame.xyz/join-game?code=${gameCode}&bgcolor=222629&color=FFFFFF&format=svg`
    })

    aliasForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const alias = aliasForm['alias'].value

        get(ref(rdb, 'games/' + gameCode + '/aliases')).then((data) => {
            get(ref(rdb, 'games/' + gameCode + '/inAliases')).then((data2) => {
                const updates = {}
                const updates2 = {}

                var rNum = Math.floor(Math.random() * 10000)
                if (data.val() == null) {
                    const aliases = []
                    const string = `${alias}-${rNum}`
                    aliases.push(string)
                    updates['games/' + gameCode + '/aliases'] = aliases
                    updates['games/' + gameCode + '/inAliases'] = aliases
                    update(ref(rdb), updates)
                    aliasForm.reset()
                } else {
                    const string = `${alias}-${rNum}`
                    const array = data.val()
                    array.push(string)
                    updates['games/' + gameCode + '/aliases'] = array
                    updates['games/' + gameCode + '/inAliases'] = array
                    update(ref(rdb), updates)
                    aliasForm.reset()
                }
            })
        })
    })

    get(ref(rdb, `games/${gameCode}/redirectPlayers`)).then((rData) => {
        const redirect = rData.val()

        if (redirect) {
            const updates = {}
            updates['games/' + gameCode + '/redirectPlayers'] = false
            update(ref(rdb), updates)
        }
    })

    const playerCShow = document.getElementById('players')
    const playersRef = ref(rdb, 'games/' + gameCode + '/playerCount');
    onValue(playersRef, (snapshot) => {
        const data = snapshot.val();
        playerCShow.innerHTML = data

        if (data >= 50) {
            playerCShow.innerHTML = `${50} - Player limit reached.`
            playerCShow.style.color = 'red'
        }
        
        const aRef = ref(rdb, 'games/' + gameCode + '/isStarted');
        onValue(aRef, (snapshot) => {
            const data2 = snapshot.val();
            
            if (data2) {
                window.location.replace(`playing.html?code=${gameCode}`)
            }
        })
    });

    const aliasCShow = document.getElementById('aliasesCount')
    onValue(ref(rdb, 'games/' + gameCode + '/aliases'), (aData) => {
        const data = aData.val()
        const aliasCount = data.length

        aliasCShow.innerHTML = `${aliasCount}`
    })

    onValue((ref(rdb, 'games/' + gameCode + '/lobbyActive')), (snapshot) => {
        const lobbyActive = snapshot.val()

        if (!lobbyActive) {
            alert('This lobby has been closed')
            window.location.replace('play.html')
        }
    })

    startBtn.onclick = function (e) {
        get(ref(rdb, 'games/' + gameCode + '/aliases')).then((data) => {
            const aliases = data.val()
            if (aliases == null) {
                alert('You must enter some aliases first')
            } else {
                const uRef = ref(rdb, `games/${gameCode}/isStarted`)
                get(uRef).then((snapshot) => {
                    const updates = {}
                    updates['games/' + gameCode + '/isStarted'] = true
        
                    return update(ref(rdb), updates)
                }). then(() => {
                    window.location.replace(`playing.html?code=${gameCode}`)
                })
            }
        })
    }

    endGameBtn.onclick = function (e) {
        get(ref(rdb, `games/${gameCode}/lobbyActive`)).then((lData) => {
            const updates = {}
            updates['games/' + gameCode + '/lobbyActive'] = false
            updates['games/' + gameCode + '/isActive'] = false
            update(ref(rdb), updates)
        })
    }

}

// Join via link (qr code)
if (pageName == 'join-game') {
    var params = new URLSearchParams(window.location.search);
    const enteredId = params.get('code')

    await new Promise(r => setTimeout(r, 2000)); // wait for auth to initialize
    const cUser = auth.currentUser

    getDoc(doc(db, 'games', enteredId)).then(docSnap => { // Check if username is taken
        if (!docSnap.exists()) { // If username is taken
            alert('Invalid Game Code');
        } else {
            get(ref(rdb, 'games/' + enteredId + '/isActive')).then((data) => {
                console.log(data.val())
                if (data.val() == false) {
                    alert('That game is over')
                } else {
                    const pRef = ref(rdb, `games/${enteredId}/playerCount`);
                    get(pRef).then((snapshot) => {
                        var playerCountBefore = snapshot.val()
                        playerCountBefore ++ 

                        const uRef = ref(rdb, `games/${enteredId}/playerUids`);
                        get(uRef).then((snapshot) => {
                            var uids = snapshot.val()
                            console.log(uids)

                            uids.push(cUser.uid)

                            const updates = {}
                            updates['games/' + enteredId + '/playerCount'] = playerCountBefore
                            updates['games/' + enteredId + '/playerUids'] = uids

                            return update(ref(rdb), updates)
                        }). then(() => {
                            window.location.replace(`waiting.html?code=${enteredId}`)
                        })
                    })
                }
            }) 
        }
    })
}

// Play Screen
if (pageName == 'playing') {
    const signedInAsText = document.getElementById('signedInAsText')
    signedInAsText.style.display = 'none'

    var params = new URLSearchParams(window.location.search);
    const gameCode = params.get('code')

    get(ref(rdb, 'games/' + gameCode + '/ownerUid')).then((data1) => {
        const ownerUid = data1.val()
    

    get(ref(rdb, 'games/' + gameCode + '/aliases')).then((data) => {
            const aliases = data.val()

            var list = document.createElement('ul');

            aliases.forEach(function (item) {
                var li = document.createElement('p');
                var splitName = item.split('-')[0]
                li.textContent = splitName;
                li.id = `${item}`
                li.className = 'item'
                list.appendChild(li);
                // Inject into the DOM
                var app = document.getElementById('name-list');
                app.appendChild(list);

        })

        const OnEvent = (doc) => {
            return {
                on: (type, selector, callback) => {
                    doc.addEventListener(type, (event)=>{
                        if(!event.target.matches(selector)) return;
                        callback.call(event.target, event);
                    }, false);
                }
            }
        };
        
        
        OnEvent(document).on('click', '.item', function (e) {

            if (auth.currentUser.uid != ownerUid) {
                return
            }


            const itemId = e.target.id

            if (document.getElementById(itemId).style.borderColor == 'red') {
                document.getElementById(itemId).style.color = 'white'
                document.getElementById(itemId).style.borderColor = '#86c232'
                document.getElementById(itemId).style.textDecoration = 'none'

                get(ref(rdb, 'games/' + gameCode + '/outAliases')).then((data) => {
                    const updates = {}
                    const outAliases = data.val()

                    const index = outAliases.indexOf(itemId)
                    if (index !== -1) {
                        outAliases.splice(index, 1);
                    }

                    updates['games/' + gameCode + '/outAliases'] = outAliases
                    update(ref(rdb), updates)
                })

                get(ref(rdb, 'games/' + gameCode + '/inAliases')).then((data) => {

                    const updates = {}
                    const inAliases = data.val()

                    inAliases.push(itemId)

                    updates['games/' + gameCode + '/inAliases'] = inAliases
                    update(ref(rdb), updates)

                })

            } else {
                document.getElementById(itemId).style.color = 'red'
                document.getElementById(itemId).style.borderColor = 'red'
                document.getElementById(itemId).style.textDecoration = 'line-through'

                get(ref(rdb, 'games/' + gameCode + '/outAliases')).then((data) => {
                    const updates = {}
                    if (data.val() == null) {

                        const outAliases = []
                        const string = `${itemId}`
                        outAliases.push(string)
                        updates['games/' + gameCode + '/outAliases'] = outAliases
                        update(ref(rdb), updates)

                    } else {

                        const string = `${itemId}`
                        const array = data.val()
                        array.push(string)
                        updates['games/' + gameCode + '/outAliases'] = array
                        update(ref(rdb), updates)
                        
                    }
                })

                get(ref(rdb, 'games/' + gameCode + '/inAliases')).then((data) => {
                    const updates = {}
                    const inAliases = data.val()

                    const index2 = inAliases.indexOf(itemId)
                    if (index2 !== -1) {
                        inAliases.splice(index2, 1);
                    }

                    updates['games/' + gameCode + '/inAliases'] = inAliases
                    update(ref(rdb), updates)
                })

                
            }
        });
    })
    })

    onValue(ref(rdb, "games/" + gameCode + "/outAliases"), (snapshot) => {
        const outAliases = snapshot.val();

        if (outAliases != null) {

            outAliases.forEach(function (item) {

                document.getElementById(item).style.color = 'red'
                document.getElementById(item).style.borderColor = 'red'
                document.getElementById(item).style.textDecoration = 'line-through'

            })

        }
        
    })

    const winModal = document.getElementById('winModal')
    const winModalName = document.getElementById('winner-alias')

    onValue(ref(rdb, "games/" + gameCode + "/inAliases"), (snapshot) => {
        const inAliases = snapshot.val();

        if (inAliases != null) {

            if (inAliases.length == 1) {
                winModal.style.display = 'block'
                const splitName = inAliases[0].split('-')[0]
                winModalName.textContent = `${splitName} wins!`
            }

            inAliases.forEach(function (item) {

                document.getElementById(item).style.color = 'white'
                document.getElementById(item).style.borderColor = '#86c232'
                document.getElementById(item).style.textDecoration = 'none'

            })

        }
        
    })

    get(ref(rdb, 'games/' + gameCode + '/ownerUid')).then((data) => {
        const ownerUid = data.val()

        const endGameBtn2 = document.getElementById('endGame2')

        if (ownerUid == auth.currentUser.uid) {
            const endGameBtn = document.getElementById('endGame')

            endGameBtn.style.display = 'inline'
            endGameBtn.onclick = function(e) {
                const updates = {}

                updates['games/' + gameCode + '/isStarted'] = false
                updates['games/' + gameCode + '/redirectPlayers'] = true
                updates['games/' + gameCode + '/aliases'] = []
                updates['games/' + gameCode + '/outAliases'] = []
                updates['games/' + gameCode + '/inAliases'] = []
                update(ref(rdb), updates)

            }

            endGameBtn2.style.display = 'inline'
            endGameBtn2.onclick = function(e) {
                const updates = {}
    
                updates['games/' + gameCode + '/isStarted'] = false
                updates['games/' + gameCode + '/redirectPlayers'] = true
                updates['games/' + gameCode + '/aliases'] = []
                updates['games/' + gameCode + '/outAliases'] = []
                updates['games/' + gameCode + '/inAliases'] = []
                update(ref(rdb), updates)
    
            }
        }
    })

    onValue(ref(rdb, 'games/' + gameCode + '/redirectPlayers'), (data) => {
        const redirect = data.val()
        if (redirect) {
            window.location.replace(`waiting.html?code=${gameCode}`)
        }
    })
}