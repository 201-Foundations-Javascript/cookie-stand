'use strict';



function Store(name, minCust, maxCust, avgCookieSales) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSales = avgCookieSales;
  this.randomNumberCookiesPerHour = [];
  this.newHoursOpen = [];
  this.allStores = [];
}
// var seattle = new Store('Seattle', 23, 65, 6.3);
// var tokyo = new Store('Tokyo', 3, 24, 1.2);

var stores = {
  totalCookiesPH : [],
  // locations : ['Seattle', 'Tokyo', 'Paris', 'Lima'],
  hoursOpen: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

  averageRandomNumber : function(city) {
    var maxRange = this.location[city].maxCust - this.location[city].minCust;
    var mathRandom = Math.random() * Math.floor(maxRange) + this.location[city].minCust;
    return Math.round(mathRandom);
  },
  randomCustomersPerHour : function(cityIndex) {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.location[cityIndex].newHoursOpen.push(this.averageRandomNumber(cityIndex));
    }
    return this.location[cityIndex].newHoursOpen;
    // this.hoursOpen[i]
  },
  cookiesPerHour: function (cityIndex) {
    //    var total = 0;
    for (var i = 0; i < this.hoursOpen.length; i++) {
      var cookPH = Math.floor(this.location[cityIndex].newHoursOpen[i] * this.location[cityIndex].avgCookieSales);
      this.location[cityIndex].randomNumberCookiesPerHour.push(cookPH);
    }
  },
  totalCookiesPerDay : function(cityIndex2) {

    this.cookiesPerHour(cityIndex2);
    var total = 0;
    for(var i = 0; i < this.hoursOpen.length; i++) {
      total = this.location[cityIndex2].randomNumberCookiesPerHour[i] + total;
      //  console.log(this.location[0].randomNumberCookiesPerHour)
    }
    return Math.floor(total);
  },
  totalPerHour : function() {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      var totalCookies = 0;
      for(var j = 0; j < this.location.length; j++){
      totalCookies = totalCookies + this.location[j].randomNumberCookiesPerHour[i];
      }
      this.totalCookiesPH.push(totalCookies);
      console.log(totalCookies);
    }
    // return Math.floor(totalCookies);
  },
    grandTotal : function() {
      
      var total = 0;
      for (var i = 0; i < stores.location.length; i++) {
        total = total + this.totalCookiesPerDay(i);
        
      }
      return total;
    },
  location: []
};

function newStuff(name, minCust, maxCust, cookieSales){
  var varName = new Store(name, minCust, maxCust, cookieSales);
  stores.location.push(varName);
}
newStuff('Seattle', 23, 65, 6.3);
newStuff('Tokyo', 3, 24, 1.2);
newStuff('Dubai', 11, 38, 3.7);
newStuff('Paris', 20, 38, 2.3);
newStuff('Lima', 2, 16, 4.6);

for (var i = 0; i < stores.location.length; i++) {
    stores.randomCustomersPerHour(i);
    stores.totalCookiesPerDay(i);
}
stores.totalPerHour();

function salesData() {
  var divEL = document.getElementById('sales-data');
  var empty = document.createElement('tr');
  divEL.appendChild(empty);
  var empty2 = document.createElement('th');
  empty.appendChild(empty2);
  for(var k = 0; k < stores.hoursOpen.length; k++) {
    var cookiesPHEl = document.createElement('th');
    cookiesPHEl.textContent = stores.hoursOpen[k];
    empty.appendChild(cookiesPHEl);

  }
  for(var i = 0; i < stores.location.length; i++){
    var storeUlEl = document.createElement('tr');
    var storeName = document.createElement('th');
    storeName.textContent = stores.location[i].name;
    storeUlEl.appendChild(storeName);
    // creating store name to be put into li
    // for every hour
    for(var j = 0; j < stores.hoursOpen.length; j++) {
      var cookiesPHE2 = document.createElement('td');
      cookiesPHE2.textContent = stores.location[i].randomNumberCookiesPerHour[j];
      storeUlEl.appendChild(cookiesPHE2);
    }

    var totalCookies = document.createElement('td');
    totalCookies.textContent = stores.totalCookiesPerDay(i);
    storeUlEl.appendChild(totalCookies);
    divEL.appendChild(storeUlEl);
    var totalPerHourText = document.createElement('th');
    // 
   } 
   var totalCookiesTR = document.createElement('tr');
   var totalPHText = document.createElement('th');
   totalPHText.textContent = 'Total ';
   totalCookiesTR.appendChild(totalPHText);
   divEL.appendChild(totalCookiesTR);
   for(var l = 0; l < stores.totalCookiesPH.length; l++) {
     var totalcookesPHTD = document.createElement('td');
     totalcookesPHTD.textContent = stores.totalCookiesPH[l];
     totalCookiesTR.appendChild(totalcookesPHTD);
   }
   var grandTotalTD = document.createElement('td');
   grandTotalTD.textContent = stores.grandTotal();
   totalCookiesTR.appendChild(grandTotalTD);
  var totalCookiesText = document.createElement('td');
  totalCookiesText.textContent = 'Total';
  empty.appendChild(totalCookiesText);

}
salesData();