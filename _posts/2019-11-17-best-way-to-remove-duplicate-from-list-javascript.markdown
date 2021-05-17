---
layout: post
title:  "The Best Way to Remove Duplicate From a List in JavaScript"
date:   2019-11-17 13:46:40
categories: javascript array reduce
comments: true
---

Consider the following array:  

```javascript
const fruits = ['banana', 'banana', 'cherry', 'cherry', 'strawberry', 'strawberry'];
```

There is two occurences of every element. We want to reduce the list to get only the unique names of the fruits. In other words, we want to remove duplicates.  
In JavaScript, we can think of 4 typical ways we could solve this problem.  

## 1. `includes` and a `for` loop
[`includes`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) is a method of `Array` which returns a boolean whether an array includes a certain value among its entries.  

```javascript
const uniqueFruits = [];
for (fruit of fruits) {
    if (!uniqueFruits.includes(fruit)) {
        uniqueFruits.push(fruit);
    }
}

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

Same logic with a forEach:  

```javascript
const uniqueFruits = [];
fruits.forEach((fruit) => {
    if (!uniqueFruits.includes(fruit)) {
        uniqueFruits.push(fruit);
    }
});

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

## 2. Use object `{ }` to prevent duplicate
Like any disctionary-like data type, keys of an object in JavaScript are unique. We can take advantage of this by adding our fruits as keys and value of a new object and then, iterate throughts the keys and add the values to a new array:  

```javascript
let fruitsObj = {};
fruits.forEach((fruit) => {
    fruitsObj[fruit] = fruit;
});

const uniqueFruits = Object.keys(fruitsObj).map((v) => {
    return fruitsObj[v];
});

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

## 3. Use `filter` and `indexOf`
[`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) is a method of `Array` which returns a new array with all elements that pass the test implemented by the callback function:  

```javascript
const uniqueFruits = fruits.filter((value, index, self) => {
    return self.indexOf(value) === index;
});

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

## 4. Use `Set` (ES6) and the spread syntax
On one hand, the [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) objects are collections of unique values. Every time we add a value to a Set, if the value has already be added, nothing will happened. Also, Sets are iterable
On the other hand, the [spread syntax (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), when used in an `Array` allows an iterable such as a `Set` to be expanded in places where zero or more elements are expected.  
In other words, we can use the spread syntax to insert all elements from a Set to an array.  

```javascript
const uniqueFruits = [...new Set(fruits)];

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

Alternatively, if we can replace the use of the spread syntax and convert `Set` to an Array using `Array.from`:  
```javascript
const uniqueFruits = Array.from(new Set(fruits));

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```
## Conclusion
Once you understood `Set` and the spread syntax, this is, in my opinion, the simplest approach because `Set` will automatically remove duplicates for us. From various benchmark I found on the web, it also seems to be the most efficient solution.  