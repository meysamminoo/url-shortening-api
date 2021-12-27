const nav = document.querySelector(".nav");
const boxButton = document.querySelector(".box-button");
const hamberger = document.querySelector(".hemberger");
const hambergerIcon = document.querySelector(".fa-bars");
let check = true;

hambergerIcon.addEventListener("click", function () {
  if (check) {
    hamberger.style.display = "flex";
    check = false;
  } else {
    hamberger.style.display = "none";
    check = true;
  }
});
