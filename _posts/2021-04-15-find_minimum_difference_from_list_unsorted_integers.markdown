---
layout: post
title:  "Find minimum difference from a list of unsorted integers"
date:   2019-07-11 13:46:40
categories: javascript Arrays Sorting
comments: true
---

Given an unsorted array of integers, find the minimum absolute difference between any pair.  

**Examples :**  
```
Input  : {1, 32, 8, 54, 5, 33};
Output : 1
Minimum absolute difference is 1

Input  : {20, 4, 25, 8};
Output : 4
Minimum absolute difference is 4

Input  : {1, 19, -5, 31, 38, 25, 100};
Output : 6
Minimum absolute difference is 6
```

## Methodology and Time complexity
The idea is to use sorting. Below are steps.  
1. Sort array in ascending order: O(n Log n) time.  
2. Initialize difference as the difference of the first pair: O(1) time.  
3. Compare all adjacent pairs in sorted array and keep track of minimum difference: O(n) time.  

Here is the implementation of above idea:  

```javascript
// Returns minimum difference between any pair
function findMinDiff(arr) {
    // 1. Sort array in ascending order
    arr.sort((a, b) => a - b);

    // 2. Initialize minimum difference as the difference of the first pair
    let minDiff = pis[1] - pis[0];
    // Find the min diff by comparing difference of all possible pairs
    for (let i = 2; i < minDiff; i++) {
        minDiff = Math.abs(Math.min(minDiff, pis[i] - pis[i-1]));
    }
}

let arr = [1, 32, 8, 54, 5, 33];
console.log(`Minimum difference is ${findMinDiff(arr)}`);
// Output: Minimum difference is 1
```