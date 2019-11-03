var xmlhttp = new XMLHttpRequest();
var ratesObj;

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    ratesObj = JSON.parse(this.responseText);

    document.getElementById("base__curr").innerHTML = `Base Currency: ${ratesObj.base} `;
    document.getElementById("date").innerHTML = `Date: ${ratesObj.date}`;

    ratesObj.rates.EUR = 1;

    console.log(ratesObj);

    Object.keys(ratesObj.rates).forEach(function(key) {

        // Create list of curency rates
        var node = document.createElement("LI");  
        var textnode = document.createTextNode(`Currency: ${key} Rate: ${ratesObj.rates[key]}`);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);

        // Create options of curency rates
        createOptions("current", key);
        createOptions("new", key);

    });
  }
};

xmlhttp.open("GET", "https://api.exchangeratesapi.io/latest", true);
xmlhttp.send();

function createOptions(elemId, val) {

  var select = document.getElementById(elemId);
  var option = document.createElement("option"); 
  option.text = val;
  option.value = val;
  select.appendChild(option);
}

function getRate(currency) {

  //console.log('Currency to search: ' + currency);

  let rate = 0;

  Object.keys(ratesObj.rates).forEach(function (key) {

    //console.log('Search: ' + key);

    if (currency == key) {

      //console.log('Found: ' + Number(ratesObj.rates[key]));

      rate = Number(ratesObj.rates[key]);
    }

  });

  return rate;
}

function showHide() {
    var x = document.getElementById("myList");
    var button = document.getElementById("rates__button");

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

    console.log('CurrencyFrom: ' + currencyFrom);
    console.log('CurrencyTo: ' + currencyTo);
    
    let rateFrom = getRate(currencyFrom);
    let rateTo = getRate(currencyTo);

    console.log('Rate: ' + rateFrom);

    if (rateFrom == 0 || rateTo == 0) {
        alert('Something goes wrong! Try to reload page. If it didn’t help, I am sorry!')
    }

    let result = amount / rateFrom * rateTo;

    document.getElementById("result").innerHTML = result.toFixed(2);
}