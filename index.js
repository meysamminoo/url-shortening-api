//* Selectors
const nav = document.querySelector(".nav");
const boxButton = document.querySelector(".box-button");
const hamberger = document.querySelector(".hemberger");
const hambergerIcon = document.querySelector(".fa-bars");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const errorInput = document.querySelector(".input label");
const shortLinks = document.querySelector(".short-links");

//* Event listener
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

btn.addEventListener("click", function () {
  if (input.value === "") {
    errorInput.style.display = "block";
    input.style.border = "3px solid #f46363";
  } else {
    errorInput.style.display = "none";
    input.style.border = "3px solid transparent";
    shortLink(input.value);
    input.value = "";
  }
});

function shortLink(link) {
  axios.get(`https://api.shrtco.de/v2/shorten?url=${link}`).then((res) => {
    const boxShortLink = document.createElement("div");
    boxShortLink.classList.add("box-short-link");
    const mainUrl = document.createElement("p");
    boxShortLink.appendChild(mainUrl);
    const shortLink = document.createElement("div");
    shortLink.classList.add("short-link");
    boxShortLink.appendChild(shortLink);
    const shortUrl = document.createElement("p");
    shortUrl.classList.add("short-address");
    const buttonCopy = document.createElement("button");
    buttonCopy.innerText = "Copy";
    buttonCopy.classList.add("btn-copy");
    shortLink.appendChild(shortUrl);
    shortLink.appendChild(buttonCopy);
    mainUrl.innerText = link;
    shortUrl.innerText = res.data.result.short_link;
    shortLinks.appendChild(boxShortLink);
    // todo: copy short link to clipboard
    buttonCopy.addEventListener("click", clipboardCopy);
    async function clipboardCopy() {
      let text = shortUrl.innerText;
      await navigator.clipboard.writeText(text);
    }
  });
}

// function clipboardCopy() {}
