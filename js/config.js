  
function erroMsg(paran) {
    if (paran === '1') {
        document.getElementById('erromsg').style.visibility = 'visible';
    } else {
        document.getElementById('erromsg').style.visibility = 'hidden';
    };
}

function ligaLoding(par) {
    if (par === "1") {
        var body = document.body;
        var html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        document.getElementById('fundo').style.visibility = 'visible';
        document.getElementById('fundo').style.height = height + 'px';
        window.scrollTo(0, 0);
    } else {
        document.getElementById('fundo').style.visibility = 'hidden';
    };
}

function openNav() {
    document.getElementById("erromsg").style.width = "300px";
    document.getElementById("erromsg").style.visibility = "visible";
}

function closeNav() {
    
    document.getElementById("erromsg").style.width = "";
    document.getElementById("erromsg").style.visibility = "hidden";
     console.log(123);
}
