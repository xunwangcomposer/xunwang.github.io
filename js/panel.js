/*==================================================
    Xun Wang Portfolio
    panel.js
==================================================*/

let currentPanel = null;

const panel = document.getElementById("contentPanel");

const closeButton = document.querySelector(".panel-close");


/*======================================
    Open Panel
======================================*/

function openPanel(id){

    if(!panel) return;

    panel.classList.add("active");

    switchPanel(id);

}


/*======================================
    Close Panel
======================================*/

function closePanel(){

    if(!panel) return;

    panel.classList.remove("active");

}


/*======================================
    Toggle
======================================*/

function togglePanel(id){

    if(panel.classList.contains("active")){

        closePanel();

        return;

    }

    openPanel(id);

}


/*======================================
    Switch Section
======================================*/

function switchPanel(id){

    document.querySelectorAll(".panel-section").forEach(section=>{

        section.classList.remove("active");

    });

    const target=document.getElementById(id);

    if(target){

        target.classList.add("active");

        currentPanel=id;

    }

}

/*======================================
    Biography
======================================*/

function openBiography(){

    openPanel("biographyPanel");

}


/*======================================
    Home
======================================*/

function goHome(){

    closePanel();

}


/*======================================
    ESC
======================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closePanel();

    }

});


/*======================================
    Close Button
======================================*/

if(closeButton){

    closeButton.addEventListener("click",closePanel);

}


/*======================================
    Click Outside
======================================*/

panel.addEventListener("click",(e)=>{

    if(e.target===panel){

        closePanel();

    }

});

/*======================================
    Menu
======================================*/

function initPanel(){

    const menu=document.querySelector(".glass-menu");

    if(!menu) return;

    const links=menu.querySelectorAll("a");

    links.forEach(link=>{

        const text=link.textContent.trim().toLowerCase();

        if(text==="biography"){

            link.addEventListener("click",(e)=>{

                e.preventDefault();

                openBiography();

            });

        }

        if(text==="home"){

            link.addEventListener("click",(e)=>{

                e.preventDefault();

                goHome();

            });

        }

    });

}

/*======================================
    Initialize
======================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initPanel();

});
