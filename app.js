const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdoenSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for both <select> 
for (let selectTag of dropdoenSelect) {
  // pass country name in <select>
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    selectTag.append(newOption);
    //for default selected
    if (selectTag.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (selectTag.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }
  // to change country flag with its name
  selectTag.addEventListener("change", (ele) => {
    updateFlag(ele.target);
  });
}

let updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let imgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = imgSrc;
};

let updateExchangeRate = async () => {
  //acces amt that user is entered
  let amt = document.querySelector(".amount");
  let amtValue = amt.value;
  // check if amt is valid num or not, if not then default value is 1
  if (isNaN(amtValue) || amtValue === "" || amtValue < 1) {
    amt.value = 1;
  }

  //'from-country' curr rate url
  const baseUrl = `${url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(baseUrl);
  let data = await response.json();

  //access 'to-country' curr rate from 'data(baseUrl)'
  let toCurrRate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmt = Math.round(amtValue * toCurrRate * 100) / 100;
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", ()=> {
  updateExchangeRate();
})