/*==================================================
    Xun Wang Portfolio
    main.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializePage();

});


/*======================================
    Initialize
======================================*/

function initializePage(){

    heroAnimation();

    highlightMenu();

    scrollAnimation();

    pageLoaded();

}


/*======================================
    Page Loaded
======================================*/

function pageLoaded(){

    document.body.classList.add("loaded");

}


/*======================================
    Hero Animation
======================================*/

function heroAnimation(){

    const hero = document.querySelector(".hero");

    if(hero){

        hero.classList.add("fade-up");

    }

}


/*======================================
    Active Menu
======================================*/

function highlightMenu(){

    const current = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".glass-menu a");

    links.forEach(link=>{

        const li = link.parentElement;

        li.classList.remove("active");

        if(link.getAttribute("href")===current){

            li.classList.add("active");

        }

        if(current==="" && link.getAttribute("href")==="index.html"){

            li.classList.add("active");

        }

    });

}


/*======================================
    Scroll Hint
======================================*/

function scrollAnimation(){

    const scroll = document.querySelector(".scroll-indicator");

    if(!scroll) return;

    let visible=true;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            if(visible){

                scroll.style.opacity="0";

                visible=false;

            }

        }else{

            scroll.style.opacity="1";

            visible=true;

        }

    });

}


/*======================================
    Smooth Anchor
======================================*/

document.querySelectorAll('a[href^="#"]:not([data-panel])').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const href=this.getAttribute("href");

        if(href==="#"){

            return;

        }

        e.preventDefault();

        const target=document.querySelector(href);

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*======================================
    Resize
======================================*/

window.addEventListener("resize",()=>{

    document.body.classList.remove("loaded");

    setTimeout(()=>{

        document.body.classList.add("loaded");

    },100);

});


/*======================================
    Window Focus
======================================*/

window.addEventListener("focus",()=>{

    document.body.classList.remove("blurred");

});


window.addEventListener("blur",()=>{

    document.body.classList.add("blurred");

});
