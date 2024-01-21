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


const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })

}
displayMovements(account1.movements);

const calcDisplayBalance = function(movements){
  const balance = movements.reduce(function(acc, move ){
     return acc + move
    }, 0 // zero is a initial value of acculator
  );
  // console.log(balance);
  labelBalance.textContent = `${balance} €`;

}
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(movements){
  const income = movements.filter(move => move > 0).reduce((acc, move) => acc + move, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = movements.filter(move => move < 0).reduce((acc, move) => acc + move, 0);
  labelSumOut.textContent = `${Math.abs( outcome)}€`;

  const calcInterest = movements.filter(move => move > 0)
                      .map( deposit => deposit * 1.2/100)
                      .filter(int => int >= 1 )  // bcoz bank change rule and interest less than 1 is not accountable.
                      .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${ calcInterest}€`;

}
calcDisplaySummary(account1.movements);

const createUserName = function(accounts){
  accounts.forEach(function(acc){
    acc.username = acc.owner
                .toLowerCase()
                .split(' ')
                .map(word => word[0]) // map method use
            // .map(function(word){ return word[0]}) same as above but lengthy
                .join('');
  })
}
createUserName(accounts);
// console.log(accounts);

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
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
let Julia =  [3, 5, 2, 12, 7];
let JuliaCorrect = Julia.slice();
JuliaCorrect.splice(0,1);
JuliaCorrect.splice(-2);

let kate = [4, 1, 15, 8, 3];
console.log(JuliaCorrect);

const Dogs =[...JuliaCorrect,...kate]

const chheckDog = function(arr){
  arr.forEach((dog, i)=>{
    if(dog >= 3){
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    }
    else{
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  })
}
chheckDog(Dogs);*/

/*
/////////////////// map method in array///////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

//with arrow function
const movementsUSD = movements.map(move => Math.trunc(move * euroToUsd));

// with normal function
// const movementsUSD = movements.map(function (move) {
//   return Math.trunc(move * euroToUsd)
// });
console.log(movementsUSD);*/

///////////filter methods////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const withdrawal = movements.filter( move => move < 0);
console.log(withdrawal);*/


/////////////// reduce method ///////////////////////////////

// acc = accumulator -> SNOWBALL
const balance = movements.reduce( (acc, move) => acc + move , 0)
// console.log(balance);

const largest = movements.reduce(function (acc, move){
  if(acc > move) return acc;
  else return move;
}, movements[0]);
// console.log(largest);
//

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function(dogs){

  const dogToHuman = dogs.map(dog => dog <= 2 ? 2 * dog : 16 + dog * 4)
  console.log(dogToHuman);
  const filterd  = dogToHuman.filter(dog => dog >=18)
  console.log(filterd);
  // const adult =  filterd.reduce( (acculator , dog , i , arr)=> acculator + dog / arr.length, 0);
  // console.log(adult);
  const adult =  filterd.reduce(function(acculator , dog , i , arr){
     return acculator + dog / arr.length
},0)
  console.log(dogToHuman);
}
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///// Challenge 3 //////////
// using chaining method

const calcAverageHuman = function(dogs){
  const dogToHuman = dogs.map(dog => dog <= 2 ? 2 * dog : 16 + dog * 4).filter(dog => dog >=18).reduce( (acculator , dog , i , arr)=> acculator + dog / arr.length, 0);
  console.log(dogToHuman);

}
// calcAverageHuman([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHuman([16, 6, 10, 5, 6, 1, 4]);