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
function Franchise(){
  
  this.totalCookiesPH = new Array(14).fill(0);
  this.location = [];  
}
var hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];




Franchise.prototype.averageRandomNumber = function(city) {
  var maxRange = this.location[city].maxCust - this.location[city].minCust;
  var mathRandom = Math.random() * Math.floor(maxRange) + this.location[city].minCust;
  return Math.round(mathRandom);
};
Franchise.prototype.randomCustomersPerHour = function(cityIndex) {
  for (var i = 0; i < hoursOpen.length; i++) {
    this.location[cityIndex].newHoursOpen.push(this.averageRandomNumber(cityIndex));
  }
  return this.location[cityIndex].newHoursOpen;
  // this.hoursOpen[i]
};
Franchise.prototype.cookiesPerHour = function (cityIndex) {
  //    var total = 0;
  for (var i = 0; i < hoursOpen.length; i++) {
    var cookPH = Math.floor(this.location[cityIndex].newHoursOpen[i] * this.location[cityIndex].avgCookieSales);
    this.location[cityIndex].randomNumberCookiesPerHour.push(cookPH);
  }
};
Franchise.prototype.totalCookiesPerDay = function(cityIndex2) {

  this.cookiesPerHour(cityIndex2);
  var total = 0;
  for(var i = 0; i < hoursOpen.length; i++) {
    
    total = this.location[cityIndex2].randomNumberCookiesPerHour[i] + total;
    //  console.log(this.location[0].randomNumberCookiesPerHour)
  }
  return Math.floor(total);
};
Franchise.prototype.totalPerHour = function() {
  // var totalCookiesPH = 0;
  for(var j = 0; j < this.location.length; j++){
    for (var i = 0; i < hoursOpen.length; i++) {
    this.totalCookiesPH[i] += this.location[j].randomNumberCookiesPerHour[i];
    }
    console.log(this.totalCookiesPH);

    // this.totalCookiesPH.push(totalCookies);
  }
};
Franchise.prototype.grandTotal = function() {      
  var total = 0;
  for(var j = 0; j < franchiseArray.length; j++){
  for (var i = 0; i < franchiseArray[j].location.length; i++) {
    total = total + this.totalCookiesPerDay(i);    
  }}
  return total;
};
function removeFinalRow() {
  var remove = document.getElementById('remove');
  remove.remove();
};
var franchiseArray = [];
function newFranchise(event){
  event.preventDefault();
  // var franchiseName = event.target.franchiseName.value;
  var createFranchise = new Franchise();
  franchiseArray.push(createFranchise);

};

function newStuff(event){
  event.preventDefault();  
  var storeName = event.target.location.value;
  var minCust = parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var cookieSales = parseInt(event.target.avgCookieSales.value);  
  var varName = new Store(storeName, minCust, maxCust, cookieSales);
  for(var i = 0; i < franchiseArray.length; i++){
  franchiseArray[i].location.push(varName);  
}
if(document.getElementById('sales-data'));
  var table = document.getElementById('sales-data');
  table.innerHTML = '';

  salesData();
  
}
var storesEle = document.getElementById('franchise');
storesEle.addEventListener('submit', newFranchise);
var franchiseEle = document.getElementById('stores');
franchiseEle.addEventListener('submit', newStuff);


// newStuff(stores,'Seattle', 23, 65, 6.3);
// newStuff(stores,'Tokyo', 3, 24, 1.2);
// newStuff(stores,'Dubai', 11, 38, 3.7);
// newStuff(stores,'Paris', 20, 38, 2.3);
// newStuff(stores,'Lima', 2, 16, 4.6);



function salesData() {
  franchiseArray[0].totalCookiesPH = new Array(14).fill(0);
  var divEL = document.getElementById('sales-data');
  
  for(var j = 0; j < franchiseArray.length; j++){
    for (var i = 0; i < franchiseArray[j].location.length; i++) {
        franchiseArray[j].randomCustomersPerHour(i);
        franchiseArray[j].totalCookiesPerDay(i);
        
    }
    franchiseArray[j].totalPerHour();
    }
  var empty = document.createElement('tr');
  divEL.appendChild(empty);
  var empty2 = document.createElement('th');
  empty.appendChild(empty2);
  for(var k = 0; k < hoursOpen.length; k++) {
    var cookiesPHEl = document.createElement('th');
    cookiesPHEl.textContent = hoursOpen[k];
    empty.appendChild(cookiesPHEl);
  }
  for (var m = 0; m < franchiseArray.length; m++){
  for(var i = 0; i < franchiseArray[m].location.length; i++){
    var storeUlEl = document.createElement('tr');
    var storeName = document.createElement('th');
    storeName.textContent = franchiseArray[m].location[i].name;
    storeUlEl.appendChild(storeName);
  
    // creating store name to be put into li
    // for every hour
    for(var j = 0; j < hoursOpen.length; j++) {
      var cookiesPHE2 = document.createElement('td');
      cookiesPHE2.textContent = franchiseArray[m].location[i].randomNumberCookiesPerHour[j];
      storeUlEl.appendChild(cookiesPHE2);
    }

    var totalCookies = document.createElement('td');
    totalCookies.textContent = franchiseArray[m].totalCookiesPerDay(i);
    storeUlEl.appendChild(totalCookies);
    divEL.appendChild(storeUlEl);
    var totalPerHourText = document.createElement('th');
   } 
   var totalCookiesTR = document.createElement('tr');
   totalCookiesTR.id = 'remove';
   var totalPHText = document.createElement('th');
   totalPHText.textContent = 'Total ';
   totalCookiesTR.appendChild(totalPHText);
   divEL.appendChild(totalCookiesTR);
   
   for(var l = 0; l < franchiseArray[m].totalCookiesPH.length; l++) {
     var totalcookesPHTD = document.createElement('td');
     totalcookesPHTD.textContent = franchiseArray[m].totalCookiesPH[l];
    

     totalCookiesTR.appendChild(totalcookesPHTD);
    //  removeFinalRow();
   }
   var grandTotalTD = document.createElement('td');
   grandTotalTD.textContent = franchiseArray[m].grandTotal();
   totalCookiesTR.appendChild(grandTotalTD);
  var totalCookiesText = document.createElement('td');
  totalCookiesText.textContent = 'Total';
  empty.appendChild(totalCookiesText);
}}
