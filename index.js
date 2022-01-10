//* Selectors
const body = document.querySelector("body");
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
    hamberger.classList.add("active");
    check = false;
  } else {
    hamberger.classList.remove("active");
    check = true;
  }
});

btn.addEventListener("click", function () {
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (input.value === "") {
    errorInput.style.display = "block";
    input.style.border = "3px solid #f46363";
  } else if (!input.value.match(expression)) {
    errorInput.style.display = "block";
    input.style.border = "3px solid #f46363";
  } else {
    errorInput.style.display = "none";
    input.style.border = "3px solid transparent";
    shortLink(input.value);
    input.value = "";
  }
});
document.addEventListener("DOMContentLoaded", getUrls);

// * functions
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
    shortUrl.innerText = res.data.result.full_short_link;
    shortLinks.appendChild(boxShortLink);
    // save local URL
    saveLocalUrl({
      main: link,
      short: res.data.result.full_short_link,
    });
    // todo: copy short link to clipboard
    buttonCopy.addEventListener("click", clipboardCopy);
    async function clipboardCopy() {
      let text = shortUrl.innerText;
      await navigator.clipboard.writeText(text);
      buttonCopy.classList.add("copied");
      buttonCopy.innerText = "Copied!";
    }
  });
}

// todo: save urls in local storage
function saveLocalUrl(url) {
  let urls;
  if (localStorage.getItem("urls") === null) {
    urls = [];
  } else {
    urls = JSON.parse(localStorage.getItem("urls"));
  }
  urls.push(url);
  localStorage.setItem("urls", JSON.stringify(urls));
}

// todo: get urls from local storage after reload browser
function getUrls() {
  let urls;
  if (localStorage.getItem("urls") === null) {
    urls = [];
  } else {
    urls = JSON.parse(localStorage.getItem("urls"));
  }
  urls.forEach((url) => {
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
    mainUrl.innerText = url.main;
    shortUrl.innerText = url.short;
    shortLinks.appendChild(boxShortLink);

    // todo: copy short link to clipboard
    buttonCopy.addEventListener("click", clipboardCopy);
    async function clipboardCopy() {
      let text = shortUrl.innerText;
      await navigator.clipboard.writeText(text);
      buttonCopy.classList.add("copied");
      buttonCopy.innerText = "Copied!";
    }
  });
}
