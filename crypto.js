const api = "coinranking10ef9ed7d36924d53747534549deccf565a0cf7f4ba618bc";

const input = document.getElementById("input");
const coins = document.querySelector(".coins");
const msg = document.querySelector(".msg");
let arr = [];


input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();

    fetch("https://api.coinranking.com/v2/coins")
      .then((response) => response.json())
      .then((result) => {
        item = result.data.coins;
        console.log(item);
        yazdir(item);
        input.value = "";
        input.focus();
      });
  }
});

const yazdir = (item) => {
  let deger = input.value.toUpperCase();
  let coinName =input.value.charAt(0).toUpperCase() + input.value.toLowerCase().slice(1);

  let coin = item.filter((a) => a.name == coinName || a.symbol == deger);

  coin.forEach((element) => {
    const { name, iconUrl, price, change, symbol } = element;

    fiyat = Number(element.price).toFixed(8);
    coins.innerHTML += `<li class="coin">
  <p class="name">${element.name} <sup class="coin-name">${element.symbol}</sup></p>
  <p class="coin-temp">$${fiyat}</p>
  <img class="coin-icon id="logo" src="${element.iconUrl}" alt="">
  <p class="change" >${element.change}%</p>
  </li>`;

  msg.innerText=""
  });

  sil();
};



const sil = () => {
  const coin = document.querySelectorAll(".coin");
  let counter = 0;
  let deger = input.value.toUpperCase();

  coin.forEach((a) => {
    const b = a.firstElementChild.innerText.toLowerCase();

    if (b.includes(input.value.toLowerCase())) {
      counter++;
      if (counter > 1) {
        a.remove();
        msg.innerText=`You already have ${deger} info. Search for another one 🔎`
      }
    }
  });
};
