---
layout: post
title:  "Memoization in JavaScript"
date:   2019-09-14 13:46:40
categories: javascript memoization
comments: true
archived: true
---

Memoization is an optimization technique and a specific type of caching. It's used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. While related to lookup tables, since memoization often uses such tables in its implementation, memoization populates its cache of results transparently on the fly, as needed, rather than in advance. Memoization is a way to lower a function's time cost in exchange for space cost.  

In order to memoize a function, it should be pure so that return values are the same for same inputs every time.  

## Real world use case: Spreadsheet
To illustrate this technique we will take the exemple of a 1-dimensional spreadsheet.  
For the shake of simplicity we will only consider that each input cell's content is provided as an addition `formula` with two operands `arg1` and `arg2`.  
This arguments can be pure number, for example: "3" will have the value `3`, or a reference, for exemple "$0" will have the value of the result of the first cell.  

*Note that we assume there won't be any cyclic references (a cell that reference itself or a cell that references it, directly or indirectly).*


```javascript
const cells = [
  { formula: 'ADD', arg1: '0', arg2: '0' },
  { formula: 'ADD', arg1: '1', arg2: '1' },
  { formula: 'ADD', arg1: '$0', arg2: '$1' },
  { formula: 'ADD', arg1: '$1', arg2: '$2' },
  { formula: 'ADD', arg1: '$2', arg2: '$3' },
  { formula: 'ADD', arg1: '$3', arg2: '$4' },
  { formula: 'ADD', arg1: '$4', arg2: '$5' },
  { formula: 'ADD', arg1: '$5', arg2: '$6' },
  { formula: 'ADD', arg1: '$6', arg2: '$7' }
];
```

In a brute force version, we could implement a recursive function to get the result of any given cell:  

```javascript
const getCellValue = (index) => {
    let cell = cells[index];

    let val1 = parseInt(cell.arg1);
    let val2 = parseInt(cell.arg2);
    
    if (cell.arg1[0] === '$') {
        val1 = getCellValue(parseInt(cell.arg1.substr(1)));
    }
    if (cell.arg2[0] === '$') {
        val2 = getCellValue(parseInt(cell.arg2.substr(1)));
    }

    return val1+val2;
}

console.log(getCellValue(8));
```
Output:  
```
> 42
```

A simple memoized version would be to explicitly cache the result the first time its calculated and return the cached value on subsequent calls for the same cell.  

```javascript
// Init an empty cache of the size of the 1-dimensional spreadsheet
let cache = new Array(cells.length);

const getCellValue = (index) => {
    // If the result has already be calculated, 
    // return it rather than calculating it again
    if (cache[index]) {
        return cache[index];
    }

    let cell = cells[index];

    let val1 = parseInt(cell.arg1);
    let val2 = parseInt(cell.arg2);
    
    if (cell.arg1[0] === '$') {
        val1 = getCellValue(parseInt(cell.arg1.substr(1)));
    }
    if (cell.arg2[0] === '$') {
        val2 = getCellValue(parseInt(cell.arg2.substr(1)));
    }

    // Cache the result
    cache[index] = val1+val2;
    return cache[index];
}

console.log(getCellValue(8));
```
Output:  
```
> 42
```

## Write a memoize function
Memoization can be effected implicitly via a functor factory that returns a wrapped memoized function object in a decorator pattern.  

Rather than call `getCellValue`, a new function object `memGetCellValue` is created as follows:  
```javascript
const memoize = (fn) => {
    let cache = [];
    return (...args) => {
        const i = args[0];
        if (cache[i]) {
            console.log('Fetching from cache');
            return cache[i];
        } else {
            console.log('Calculating result');
            cache[i] = fn(i);
            return cache[i];
        }
    }
}

const memGetCellValue = memoize(getCellValue);

console.log(memGetCellValue(8));
console.log(memGetCellValue(7));
```
Output:  
```
> Calculating result
> 42
> Calculating result
> 26
```

> **Higher-order functions**  
> Here, `memoize` is what we call an Higher-order function. Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.

While this approach is valid for regular functions, it will not work as expected when we pass in a recursive function to the memoize function since the recursive function on its subsequent calls will end up calling itself instead of the memoized function thereby making no use of the `cache`.

## Memoizing recursive functions

We just need to make sure that our recursive function is calling the memoized function.  

```javascript
const getCellValue = memoize(
    (index) => {
        let cell = cells[index];

        let val1 = parseInt(cell.arg1);
        let val2 = parseInt(cell.arg2);
        
        if (cell.arg1[0] === '$') {
            val1 = getCellValue(parseInt(cell.arg1.substr(1)));
        }
        if (cell.arg2[0] === '$') {
            val2 = getCellValue(parseInt(cell.arg2.substr(1)));
        }

        return val1+val2;
    }
);

console.log(getCellValue(8)); // Calculated
console.log(getCellValue(7)); // Cached
```

The factorial getCellValue is recursively calling a memoized version of itself and is caching the values of previous cells which significantly improves calculations.  
