document.querySelectorAll(".gift-card__plus").forEach(button=>{

    button.addEventListener("click",()=>{

        button.closest(".gift-card")
              .querySelector(".gift-popup")
              .classList.add("active");

    });

});

document.querySelectorAll(".gift-popup__close").forEach(button=>{

    button.addEventListener("click",()=>{

        button.closest(".gift-popup")
              .classList.remove("active");

    });

});