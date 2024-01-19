'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Array 
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
 console.log(arr);
 // Slice method
 console.log(arr.slice(2)); // make a copy and then change, it doesn't `affect original array
 console.log(arr.slice()); // to make shallow copy
 // at method
 console.log(arr.at(2));

 // splice method
 console.log(arr.splice(2,4)); // changes make in original array or we can say mutate original array.
console.log(arr);


let arr2 = ['f','g','h','i','j'];

// reverse method
console.log(arr2.reverse());

// concat method
let letters  =  arr.concat(arr2)      //     [...arr ,...arr2] using spread 
console.log(letters);

// join
console.log(letters.join(' - '));
*/

/////////////////////////////////////////////////////////////////////////////

//Looping on arrays

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For Of loop

for(const [i,move] of movements.entries()){         // we can get index of move by using enteries function
  if (move > 0){
    console.log(`You account credited ${move}`);
  }else {
    console.log(`Your account debited ${move}`);
  }
}

// ForEach method
 movements.forEach(function(move , i , arr){    // default parameters
  if (move > 0){
    console.log(`You account credited ${move}`);
  }else {
    console.log(`Your account debited ${move}` );
  }
 })
 */


 // forEach method on map
/*
 const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


currencies.forEach(function (currency, index, map) {
  console.log(`${currency} : ${index}`);
})

// Set

const currenciesUniques = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUniques);

currenciesUniques.forEach(function(currency, index,map){
  console.log(`${currency} : ${index}`); // showing same value bcoz set dont have key or index
});
*/