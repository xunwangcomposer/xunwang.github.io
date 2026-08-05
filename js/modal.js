/*==================================================
    Xun Wang Portfolio
    modal.js
==================================================*/

let modal = null;

let modalContent = null;


/*======================================
    Initialize
======================================*/

function initModal(){

    modal = document.getElementById("modal");

    if(!modal) return;

    modalContent = modal.querySelector(".modal-content");

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            closeModal();

        }

    });

}


/*======================================
    Open
======================================*/

function openModal(html){

    if(!modal) return;

    modalContent.innerHTML = html;

    modal.classList.add("active");

    document.body.style.overflow="hidden";

}


/*======================================
    Close
======================================*/

function closeModal(){

    if(!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow="";

}


/*======================================
    ESC
======================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});


/*======================================
    Image
======================================*/

function openImage(src){

    openModal(

        `<img class="modal-image" src="${src}" alt="">`

    );

}


/*======================================
    Video
======================================*/

function openVideo(src){

    openModal(

        `<video
            class="modal-video"
            controls
            autoplay>

            <source src="${src}">

        </video>`

    );

}


/*======================================
    PDF
======================================*/

function openPDF(src){

    openModal(

        `<iframe
            class="modal-pdf"
            src="${src}">
        </iframe>`

    );

}


/*======================================
    Initialize
======================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initModal();

});
