import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getFirestore, Timestamp, doc, setDoc, getDoc, deleteDoc, addDoc, collection, updateDoc, arrayUnion  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously, linkWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, set, get, child , push, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"
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
                            const enterAlias = prompt('Enter Your Alias')

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
                                        const aliases = [`${enterAlias}`]
                                        updates['games/' + enteredId + '/aliases'] = aliases
                                        updates['games/' + enteredId + '/playerCount'] = playerCountBefore
                                        updates['games/' + enteredId + '/playerUids'] = uids
                                        return update(ref(rdb), updates)
                                    } else {
                                        const string = `${enterAlias}`
                                        aliases.push(string)
                                        const updates = {}
                                        updates['games/' + enteredId + '/playerCount'] = playerCountBefore
                                        updates['games/' + enteredId + '/playerUids'] = uids
                                        updates['games/' + enteredId + '/aliases'] = aliases
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
    const copyLink = document.getElementById('copyLink')
    const endGameBtn = document.getElementById('endGame')
    const aliasForm = document.querySelector('#aliasFormOwner')
    aliasForm.style.display = 'inline'

    get(ref(rdb, 'games/' + gameCode + '/ownerUid')).then((data) => {
        const ownerUid = data.val()

        if (auth.currentUser.uid == ownerUid) {
            startBtn.style.display = 'inline'
            endGameBtn.style.display = 'inline'
            qrCode.style.display = 'inline'
            qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://aliasgame.xyz/join-game?code=${gameCode}&bgcolor=222629&color=86c232`
        }
    })

    aliasForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const alias = aliasForm['alias'].value

        get(ref(rdb, 'games/' + gameCode + '/aliases')).then((data) => {
            const updates = {}
            if (data.val() == null) {
                const aliases = []
                const string = `${alias}`
                aliases.push(string)
                updates['games/' + gameCode + '/aliases'] = aliases
                update(ref(rdb), updates)
                aliasForm.reset()
            } else {
                const string = `${alias}`
                const array = data.val()
                array.push(string)
                updates['games/' + gameCode + '/aliases'] = array
                update(ref(rdb), updates)
                aliasForm.reset()
            }
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

    copyLink.onclick = function (e) {
        copyLink.select();
        copyLink.setSelectionRange(0, 99999); /* For mobile devices */
      
        copyLink.value = `https://aliasgame.xyz/join-game?code=${gameCode}`
        navigator.clipboard.writeText(copyLink.value);
        copyLink.value = 'aliasgame.xyz/play'
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

    get(ref(rdb, 'games/' + gameCode + '/aliases')).then((data) => {
        const aliases = data.val()

        var list = document.createElement('ul');

        aliases.forEach(function (item) {
            var li = document.createElement('p');
            var rNum = Math.floor(Math.random() * 10000)
            li.textContent = item;
            li.id = `${item}-${rNum}`
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
            const itemId = e.target.id

            if (document.getElementById(itemId).style.borderColor == 'red') {
                document.getElementById(itemId).style.color = 'white'
                document.getElementById(itemId).style.borderColor = '#86c232'
            } else {
                document.getElementById(itemId).style.color = 'red'
                document.getElementById(itemId).style.borderColor = 'red'
            }
        });
    })

    get(ref(rdb, 'games/' + gameCode + '/ownerUid')).then((data) => {
        const ownerUid = data.val()

        if (ownerUid == auth.currentUser.uid) {
            const endGameBtn = document.getElementById('endGame')

            endGameBtn.style.display = 'inline'
            endGameBtn.onclick = function(e) {
                const updates = {}

                updates['games/' + gameCode + '/isStarted'] = false
                updates['games/' + gameCode + '/redirectPlayers'] = true
                updates['games/' + gameCode + '/aliases'] = []
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