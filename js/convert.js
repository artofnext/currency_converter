var xmlhttp = new XMLHttpRequest();
var ratesObj;

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    ratesObj = JSON.parse(this.responseText);

    document.getElementById("base__curr").innerHTML = `Base Currency: ${ratesObj.base} `;
    document.getElementById("date").innerHTML = `Date: ${ratesObj.date}`;

    Object.keys(ratesObj.rates).forEach(function(key) {

        // Create list of curency rates
        var node = document.createElement("LI");  
        var textnode = document.createTextNode(`Currency: ${key} Rate: ${ratesObj.rates[key]}`);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);

        // Create options of curency rates
        var select = document.getElementById("current");
        var option = document.createElement("option"); 
        option.text = key;
        option.value = key;
        select.appendChild(option);
    });
  }
};

xmlhttp.open("GET", "https://api.exchangeratesapi.io/latest", true);
xmlhttp.send();

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
    let currency = document.getElementById("currency").value;
    let rate = 0;

    Object.keys(ratesObj.rates).forEach(function(key) {
        if (currency == key) {
            rate = Number(ratesObj.rates[key]);
        }
    });

    if (rate == 0) {
        alert('Something goes wrong! Try to reload page. If it didn’t help, I am sorry!')
    }

    let result = amount * rate;

    document.getElementById("result").innerHTML = result.toFixed(2);
}