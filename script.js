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
const account5 = {
  owner: 'Yousuf Mohd',
  movements: [4300, 10000, -700, 950, 90, -20, 50, 400, -460],
  interestRate: 1,
  pin: 9794,
};
const account6 = {
  owner: 'Hashim Haidar',
  movements: [4300, -10000, -700, 950, 90, -20, 50, 400, -460],
  interestRate: 1,
  pin: 9211,
};
const account7 = {
  owner: 'Uzair Ahmad',
  movements: [4300, -10000, -700, -300, -20, 50, 400, -460],
  interestRate: 1,
  pin: 9211,
};

const accounts = [account1, account2, account3, account4, account5, account6, account7];

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

const updateUI = function (acc) {
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc)

}

// const currentTime = new Date();
// console.log(currentTime);

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">Just Now</div>
    <div class="movements__value">${mov.toFixed(2)} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })

}


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acu, move) => acu + move, 0);
  // zero is a initial value of acculator

  // console.log(balance);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;

}

const calcDisplaySummary = function (acc) {
  const income = acc.movements.filter(move => move > 0).reduce((acc, move) => acc + move, 0);
  labelSumIn.textContent = `${income.toFixed(2)}€`;

  const outcome = acc.movements.filter(move => move < 0).reduce((acc, move) => acc + move, 0);
  labelSumOut.textContent = `${Math.abs(outcome).toFixed(2)}€`;

  const calcInterest = acc.movements.filter(move => move > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int >= 1)  // bcoz bank change rule and interest less than 1 is not accountable.
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${calcInterest.toFixed(2)}€`;

}

const createUserName = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0]) // map method use
      // .map(function(word){ return word[0]}) same as above but lengthy
      .join('');
  })
}
createUserName(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {

  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount.pin === +(inputLoginPin.value)) // we can use plus operator instead Number
   {
    // clearinh input field
    inputLoginPin.value = inputLoginUsername.value = '';
    // removing focus from input
    inputLoginPin.blur();

    containerApp.style.opacity = 100;
    // changing heading
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`

    //calling function
    updateUI(currentAccount);
  }
  else {
    alert('Please enter Valid Credentials');
  }

})
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +(inputTransferAmount.value); // we can use plus operator instead Number
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(receiver, amount); // find method use here 

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 &&
    receiver &&
    currentAccount.balance >= amount &&
    receiver.username !== currentAccount.username) {

    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    updateUI(currentAccount);

    // calcDisplayBalance(currentAccount)
  }

})
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = +(inputLoanAmount.value); // we can use plus operator instead Number
  console.log(loanAmount);
  inputLoanAmount.value = '';
  if (loanAmount > 0 &&
    currentAccount.movements.some(move => move > loanAmount / 10)) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      updateUI(currentAccount)
    }, 5000)

  }
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const passPin = +(inputClosePin.value); // we can use plus operator instead Number

  inputCloseUsername.value = inputClosePin.value = '';
  if (currentAccount.username === username &&
    currentAccount.pin === passPin) {
    const index = accounts.findIndex(acc => acc.username === username)
    console.log(index);

    accounts.splice(index, 1);
    containerApp.style.opacity = '0';
    labelWelcome.textContent = `Log in to get started`
  }
})
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault()

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})
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
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300,1];
/*
const withdrawal = movements.filter( move => move < 0);
console.log(withdrawal);*/


/////////////// reduce method ///////////////////////////////

// acc = accumulator -> SNOWBALL
// const balance = movements.reduce((acc, move) => acc + move, 0)
// console.log(balance);

// const largest = movements.reduce(function (acc, move) {
//   if (acc > move) return acc;
//   else return move;
// }, movements[0]);
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

const calcAverageHumanAge = function (dogs) {

  const dogToHuman = dogs.map(dog => dog <= 2 ? 2 * dog : 16 + dog * 4)
  console.log(dogToHuman);
  const filterd = dogToHuman.filter(dog => dog >= 18)
  console.log(filterd);
  // const adult =  filterd.reduce( (acculator , dog , i , arr)=> acculator + dog / arr.length, 0);
  // console.log(adult);
  const adult = filterd.reduce(function (acculator, dog, i, arr) {
    return acculator + dog / arr.length
  }, 0)
  console.log(dogToHuman);
}
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///// Challenge 3 //////////
// using chaining method

const calcAverageHuman = function (dogs) {
  const dogToHuman = dogs.map(dog => dog <= 2 ? 2 * dog : 16 + dog * 4).filter(dog => dog >= 18).reduce((acculator, dog, i, arr) => acculator + dog / arr.length, 0);
  console.log(dogToHuman);

}
// calcAverageHuman([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHuman([16, 6, 10, 5, 6, 1, 4]);


// let arr = [16, 6, 10, 5, 6, 1, 4];
// console.log(arr.sort((a, b) => a - b));

// let arrCopy = arr.slice();

// console.log(arr.slice(2, 6))  //Slice Method
// console.log(arr)

// console.log(arr.concat(arrCopy))  //concat method

/////This methods mutate the array ///////////

// console.log(arrCopy.push(8)); //push method add element at end of array
// console.log(arrCopy);
// console.log(arrCopy.unshift(12)); // unshift method add element at start of array
// console.log(arrCopy); 

// console.log(arrCopy.pop()); // remove element from end 
// console.log(arrCopy); 
// console.log(arrCopy.shift()); // remove element from starting 
// console.log(arrCopy); 
// console.log(arrCopy.splice(4, 2)); //splice method
// console.log(arrCopy);
// console.log(arrCopy.reverse()); // reverse the array
// console.log(arrCopy.sort((a, b)=> a-b)); // sort method work differently in js thats why we write function as per need

// const allMovements = accounts.map((acc)=> acc.movements)
// console.log(allMovements); // to get all movements from all accounts
// console.log(allMovements.flat()); // unpack all sub array and make one array;
// // we can use flatmap instead of using map and flat separately

// const allMovements2 = accounts.flatMap((acc)=> acc.movements);
// console.log(allMovements2); // 

//  const newArr = new Array(7);
//  newArr.map((i)=> i+1);
//  console.log(newArr);

// const filteredArr = arr.filter((a)=> a>5); // filter
// console.log(filteredArr);

// console.log(arr.reduce((acc, curr)=> acc+ curr)); //reduce

// const lenght = 4;
// console.log(arr); 

// console.log(arr.map(a => a * a));

// console.log(arrCopy.some(a => a <10)); // return true if any element match the condition
// console.log(arrCopy.every(a => a >10)); // return  true if every element match the condition

// arr.forEach(function(a ,i ) {
//   console.log(`${i} = ${a}`);
// });

///////////////////////////////////////
// Array Methods Practice

// // 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// // 2.
// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// // Prefixed ++ oeprator
// let a = 10;
// console.log(++a);
// console.log(a);

// // 3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// // 4.
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
//     .join(' ');

//   return capitzalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));


///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];
// console.log(dogs);
// //1
// dogs.forEach(function(dog){
//  dog.recomanded = Math.trunc(dog.weight ** 0.75 * 28);
// })

// //2
// const sarah = dogs.find(dog => dog.owners.includes('Sarah'))
// console.log(sarah);

// //3
// const ownersEatTooMuch = dogs.filter(dog => dog.recomanded > dog.curFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);
// const ownersEatTooLittle = dogs.filter(dog => dog.recomanded < dog.curFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// //4
// //"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little`);

// //5
// console.log(dogs.some(dog  => dog.curFood === dog.recomanded));

// //6
// const checkEatingOkey = dog => dog.curFood > dog.recomanded * 0.9 && dog.curFood < dog.recomanded * 1.1;
// console.log(dogs.some(checkEatingOkey));

// //7

// const dogEatingOkay = dogs.filter(checkEatingOkey);
// console.log(dogEatingOkay);

// //8
// const dogSorted = dogs.slice().sort((a , b) => a.recomanded - b.recomanded);
// console.log(dogSorted);

labelBalance.addEventListener('click', function(){
  const move = document.querySelectorAll('.movements__row');
  move.forEach(function(row , i){
    if(i % 2 === 1) row.style.backgroundColor = 'red';
    if(i % 2 === 0) row.style.backgroundColor = 'black'
  })
})