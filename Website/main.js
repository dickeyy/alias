function startGame() {
    var select = document.getElementById('playerSelect');
    var value = select.options[select.selectedIndex].value;
    if (value = 0) {
        document.getElementById("playerSelect").style.display = "block";
    }
    else if (value != 0) {
        document.getElementById("playerSelect").style.display = "none";
    }
    document.getElementById("testies").innerHTML = value;
}

function playScreenLoad() {
    var params = new URLSearchParams(window.location.search);
    if (params == "players=3") {
        window.location.replace("https://aliasgame.xyz/play-files/p3");
    }
     if (params == "players=4") {
        window.location.replace("https://aliasgame.xyz/play-files/p4")
    }
    else if (params == "players=5") {
        window.location.replace("https://aliasgame.xyz/play-files/p5")
    }
    else if (params == "players=6") {
        window.location.replace("https://aliasgame.xyz/play-files/p6")
    }
    else if (params == "players=7") {
        window.location.replace("https://aliasgame.xyz/play-files/p7")
    }
    else if (params == "players=8") {
        window.location.replace("https://aliasgame.xyz/play-files/p8")
    }
    else if (params == "players=9") {
        window.location.replace("https://aliasgame.xyz/play-files/p9")
    }
    else if (params == "players=10") {
        window.location.replace("https://aliasgame.xyz/play-files/p10")
    }
    else if (params == "players=11") {
        window.location.replace("https://aliasgame.xyz/play-files/p11")
    }
    else if (params == "players=12") {
        window.location.replace("https://aliasgame.xyz/play-files/p12")
    }
    else if (params == "players=13") {
        window.location.replace("https://aliasgame.xyz/play-files/p13")
    }
    else if (params == "players=14") {
        window.location.replace("https://aliasgame.xyz/play-files/p14")
    }
    else if (params == "players=15") {
        window.location.replace("https://aliasgame.xyz/play-files/p15")
    }
    else if (params == "players=16") {
        window.location.replace("https://aliasgame.xyz/play-files/p16")
    }
    else if (params == "players=17") {
        window.location.replace("https://aliasgame.xyz/play-files/p17")
    }
    else if (params == "players=18") {
        window.location.replace("https://aliasgame.xyz/play-files/p18")
    }
    else if (params == "players=19") {
        window.location.replace("https://aliasgame.xyz/play-files/p19")
    }
    else if (params == "players=20") {
        window.location.replace("https://aliasgame.xyz/play-files/p20")
    }
    else if (params == "players=21") {
        window.location.replace("https://aliasgame.xyz/play-files/p21")
    }
    else if (params == "players=22") {
        window.location.replace("https://aliasgame.xyz/play-files/p22")
    }
    else if (params == "players=23") {
        window.location.replace("https://aliasgame.xyz/play-files/p23")
    }
    else if (params == "players=24") {
        window.location.replace("https://aliasgame.xyz/play-files/p24")
    }
    else if (params == "players=25") {
        window.location.replace("https://aliasgame.xyz/play-files/p25")
    }
    else if (params == "players=26") {
        window.location.replace("https://aliasgame.xyz/play-files/p26")
    }
    else if (params == "players=27") {
        window.location.replace("https://aliasgame.xyz/play-files/p27")
    }
    else if (params == "players=28") {
        window.location.replace("https://aliasgame.xyz/play-files/p28")
    }
    else if (params == "players=29") {
        window.location.replace("https://aliasgame.xyz/play-files/p29")
    }
    else if (params == "players=30") {
        window.location.replace("https://aliasgame.xyz/play-files/p30")
    }
    else if (params == "players=31") {
        window.location.replace("https://aliasgame.xyz/play-files/p31")
    }
    else if (params == "players=32") {
        window.location.replace("https://aliasgame.xyz/play-files/p32")
    }
    else if (params == "players=33") {
        window.location.replace("https://aliasgame.xyz/play-files/p33")
    }
    else if (params == "players=34") {
        window.location.replace("https://aliasgame.xyz/play-files/p34")
    }
    else if (params == "players=35") {
        window.location.replace("https://aliasgame.xyz/play-files/p35")
    }
}