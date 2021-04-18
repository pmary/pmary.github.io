---
layout: post
title:  "The container stacking problem"
date:   2019-08-02 13:46:40
categories: javascript stack
comments: true
---
At seaport terminals, containers are stacked up, waiting to be loaded onto their ships When we load a ship, if the correct containers are on the top of the stack, they are easy to pick and to load. But if the wanted container is underneath some other, move them aside to reach it would cause extra operation cost and waste time.  
The schedule of the ships is known and we assume that no ship will be late. There are ship A to ship Z and their containers are labeled after them.  

**Example:**  
Seven containers to the terminal in this order:

```
Input  : {'B', 'D', 'N', 'I', 'D', 'P', 'D'}
Output : { { 'B' }, { 'D', 'D', 'D' }, { 'N', 'I' }, { 'P' } }
```
The containers are arranged in 4 stacks: 
```
     ___
    | D |
    |___|___
    | D | I |
 ___|___|___|___
| B | D | N | P |
|___|___|___|___|
```

**A Stack Based approach:**  
1. In this approach, I have used the data structure stack to implement this task. 
2. Here, two stacks are used. One stack stores the actuel containers arriving and the other is the initial container stack.
3. The container stacking problem is solved using only the Push and Pop functions of Stack.
4. When a new container arrives, we check for every existing container stack if it's ship is scheduled to arrive before the ship of the previous container in the considered stack. If so, we put it in this stack, else we move to the next.
5. If the container doesn't fit in any stack, we create a new one and put it in.

**Time Complexity:**
The Time Complexity is O(n) since every element of the array is added and removed from the stack at most once. So there are total 2n operations at most. Assuming that a stack operation takes O(1) time, we can say that the time complexity is O(n).

```javascript
function addToExistingStack(stacks, item) {
    for (let y = 0; y < stacks.length; y++) {
        const lastItem = stacks[y][stacks[y].length-1];
        if (item <= lastItem) {
            stacks[y].push(item);
            return true;
        }
    }
    
    return false;
}

const conts = ['B', 'D', 'N', 'I', 'D', 'P', 'D'];

let stacks = [
    [conts.shift()]
];

while(conts.length){
    const newCont = conts.shift();

    let isNewContStacked = addToExistingStack(stacks, newCont);            
    if (!isNewContStacked) {
        stacks.push([newCont]);
    }
}

console.log(stacks.length);
```