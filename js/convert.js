let xmlhttp = new XMLHttpRequest();
let ratesObj;

xmlhttp.onreadystatechange = function() {
  let alert = document.getElementById("base__curr");
  if (this.readyState == 4 && this.status == 200) {
    ratesObj = JSON.parse(this.responseText);

    document.getElementById("base__curr").innerHTML = `Base Currency: ${ratesObj.base} `;
    document.getElementById("date").innerHTML = `Date: ${ratesObj.date}`;

    ratesObj.rates.EUR = 1;

    // console.log(ratesObj);

    Object.keys(ratesObj.rates).forEach(function(key) {

        // Create list of curency rates
        let node = document.createElement("LI");  
        let textnode = document.createTextNode(`Currency: ${key} Rate: ${ratesObj.rates[key]}`);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);

        // Create options of curency rates
        createOptions("currencyfrom", key);
        createOptions("currencyto", key);

    });

    document.getElementById("amount").disabled = false;
    document.getElementById("currencyfrom").disabled = false;
    document.getElementById("currencyto").disabled = false;
    document.getElementById("convert").disabled = false;
    document.getElementById("rates__button").disabled = false;
    document.getElementById("button_revert").disabled = false;
    alert.style.color = 'initial';

    // console.log("Enable block");

  } else {

    // console.log("Disable block");

    alert.innerHTML = `Sorry!`;
    alert.style.color = 'red';
    document.getElementById("date").innerHTML = `It seems that there isn't connection!<br>Try refresh the page.`;
    document.getElementById("amount").disabled = true;
    document.getElementById("currencyfrom").disabled = true;
    document.getElementById("currencyto").disabled = true;
    document.getElementById("convert").disabled = true;
    document.getElementById("rates__button").disabled = true;
    document.getElementById("button_revert").disabled = true;
  }
};

xmlhttp.open("GET", "https://api.exchangeratesapi.io/latest", true);
xmlhttp.send();

function createOptions(elemId, val) {

  let select = document.getElementById(elemId);
  let option = document.createElement("option"); 
  option.text = val;
  option.value = val;
  select.appendChild(option);
}

function getRate(currency) {

  let rate = 0;

  Object.keys(ratesObj.rates).forEach(function (key) {

    if (currency == key) {
      rate = Number(ratesObj.rates[key]);
    }

  });

  return rate;
}

function revert() {
  let store = document.getElementById("currencyto").value;
  document.getElementById("currencyto").value = document.getElementById("currencyfrom").value;
  document.getElementById("currencyfrom").value = store;

  store = document.getElementById("currencyto").text;
  document.getElementById("currencyto").text = document.getElementById("currencyfrom").text;
  document.getElementById("currencyfrom").text = store;

  // console.log("Revert block");

  let revertSvg = document.getElementById('revert_icon');
  revertSvg.style.transition = 'all .3s ease-in';
  revertSvg.style.transform = (revertSvg.style.transform == 'rotate(-180deg)') ? 'rotate(0deg)' : 'rotate(-180deg)';
}

function showHide() {
  let x = document.getElementById("myList");
  let button = document.getElementById("rates__button");

  if (x.style.display === "block") {
    x.style.display = "none";
    button.textContent = "Show Rates"
  } else {
    x.style.display = "block";
    button.textContent = "Hide Rates"
  }
}

function convert() {
  let amount = document.getElementById("amount").value;
  let currencyFrom = document.getElementById("currencyfrom").value;
  let currencyTo = document.getElementById("currencyto").value;

  // console.log('CurrencyFrom: ' + currencyFrom);
  // console.log('CurrencyTo: ' + currencyTo);

  let rateFrom = getRate(currencyFrom);
  let rateTo = getRate(currencyTo);

  // console.log('Rate: ' + rateFrom);

  if (rateFrom == 0 || rateTo == 0) {
    alert('Something goes wrong! Try to reload page. If it didn’t help, I am sorry!')
  } else {

    let result = amount / rateFrom * rateTo;

    document.getElementById("result").innerHTML = result.toFixed(2);
  }
}