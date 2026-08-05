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

        const panelId=link.getAttribute("data-panel");

        if(panelId){

            link.addEventListener("click",(e)=>{

                e.preventDefault();

                openPanel(panelId);

            });

            return;

        }

        // Links without a data-panel (i.e. "Home") just close the popup

        if(link.getAttribute("href")==="index.html"){

            link.addEventListener("click",(e)=>{

                e.preventDefault();

                goHome();

            });

        }

    });

}

/*======================================
    Email Popup
======================================*/

function initEmailModal(){

    const trigger=document.getElementById("emailTrigger");

    const modal=document.getElementById("emailModal");

    if(!trigger||!modal) return;

    const closeBtn=modal.querySelector(".email-modal-close");

    const copyPairs=[

        {btn:document.getElementById("emailCopyBtn"),text:document.getElementById("emailAddress")},

        {btn:document.getElementById("phoneCopyBtn"),text:document.getElementById("phoneNumber")}

    ];

    trigger.addEventListener("click",(e)=>{

        e.preventDefault();

        modal.classList.add("active");

    });

    function closeEmailModal(){

        modal.classList.remove("active");

    }

    if(closeBtn){

        closeBtn.addEventListener("click",closeEmailModal);

    }

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            closeEmailModal();

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeEmailModal();

        }

    });

    copyPairs.forEach(({btn,text})=>{

        if(!btn||!text) return;

        btn.addEventListener("click",()=>{

            const value=text.textContent.trim();

            navigator.clipboard.writeText(value).then(()=>{

                btn.textContent="Copied";

                btn.classList.add("copied");

                setTimeout(()=>{

                    btn.textContent="Copy";

                    btn.classList.remove("copied");

                },1800);

            });

        });

    });

}


/*======================================
    External Link Confirmation
======================================*/

function initLinkConfirm(){

    const modal=document.getElementById("linkConfirmModal");

    if(!modal) return;

    const nameEl=document.getElementById("confirmLinkName");

    const cancelBtn=document.getElementById("confirmCancelBtn");

    const continueBtn=document.getElementById("confirmContinueBtn");

    let pendingUrl=null;

    document.querySelectorAll(".confirm-link").forEach(link=>{

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            pendingUrl=link.getAttribute("href");

            nameEl.textContent=link.getAttribute("data-label")||"this link";

            modal.classList.add("active");

        });

    });

    function closeConfirm(){

        modal.classList.remove("active");

        pendingUrl=null;

    }

    if(cancelBtn){

        cancelBtn.addEventListener("click",closeConfirm);

    }

    if(continueBtn){

        continueBtn.addEventListener("click",()=>{

            if(pendingUrl){

                window.open(pendingUrl,"_blank","noopener");

            }

            closeConfirm();

        });

    }

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            closeConfirm();

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeConfirm();

        }

    });

}


/*======================================
    Initialize
======================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initPanel();

    initEmailModal();

    initLinkConfirm();

});
