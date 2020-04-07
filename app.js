'use strict';

var stores = {
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
        for (var i = 0; i < this.location[cityIndex].newHoursOpen.length; i++) {
           var cookPH = this.location[cityIndex].newHoursOpen[i] * this.location[cityIndex].avgCookieSales;
           this.location[cityIndex].randomNumberCookiesPerHour.push(cookPH);
            // console.log(cookPH);
            // console.log(cookPH2);
        }
    },

    totalCookiesPerDay : function(cityIndex2) {
     var total = 0;
        for(var i = 0; i < this.hoursOpen.length; i++) {
         total = this.location[cityIndex2].randomNumberCookiesPerHour[i] + total;
        //  console.log(this.location[0].randomNumberCookiesPerHour)
     } 
     return total;
    },
    location: [
        {
            name: 'Seattle',
            minCust: 23,
            maxCust: 65,
            avgCookieSales: 6.3,
            randomNumberCookiesPerHour : [],
            newHoursOpen : []

        },
        {
            name: 'Tokyo',
            minCust: 3,
            maxCust: 24,
            avgCookieSales: 1.2,
            newHoursOpen : [],
            randomNumberCookiesPerHour : [],

        },
        {
            name: 'Dubai',
            minCust: 11,
            maxCust: 38,
            avgCookieSales: 3.7,
            newHoursOpen : [],
            randomNumberCookiesPerHour : [],
        },
        {
            name: 'Paris',
            minCust: 20,
            maxCust: 38,
            avgCookieSales: 2.3,
            newHoursOpen : [],
            randomNumberCookiesPerHour : [],

        },
        {
            name: 'Lima',
            minCust: 2,
            maxCust: 16,
            avgCookieSales: 4.6,
            newHoursOpen : [],
            randomNumberCookiesPerHour : [],
        },
    ]


    // minCust : [23, 3, 11, 20, 2],
    // maxCust : [65, 24, 38, 38, 16],
    // avgCookieSales : [6.3, 1.2, 3.7, 2.3, 4.6],


}

// for (var i = 0; i < 5; i++) {
//     stores.averageRandomNumber(i);
//     stores.randomCustomersPerHour(i);
//     stores.cookiesPerHour(i);
//     stores.totalCookiesPerDay(i);
// }
console.log(stores.averageRandomNumber(0));
console.log(stores.randomCustomersPerHour(0));
console.log(stores.location[0].randomNumberCookiesPerHour);
console.log(stores.totalCookiesPerDay(0));


