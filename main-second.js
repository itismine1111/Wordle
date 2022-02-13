document.addEventListener("DOMContentLoaded", () => {

    let startmodal = document.querySelector(".starting-modal");
    let startmodalexitbtn = document.querySelector(".exit");

    function displayBtn() {
        startmodalexitbtn.style.display = 'block';
    }
    setTimeout(displayBtn, 4000);

    startmodalexitbtn.addEventListener("click", function(){
        startmodal.style.opacity = "0";
        startmodal.style.zIndex = "-10";
    })

});