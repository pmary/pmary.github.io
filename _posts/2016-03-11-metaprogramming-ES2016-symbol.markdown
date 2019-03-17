---
layout: post
title:  "Metaprogramming in JavaScipt - Symbol"
date:   2016-03-11 13:46:40
categories: javascript metaprogramming
comments: true
---

JavaScript was relatively weak when it comes to metaprogramming. Fortunately ES6 adds several new forms/features for it. So it's a good occasion to review the state of metaprogramming in 2016.

## Programming versus metaprogramming  
If you are not familiar with the concept, let's first explain it.

> Metaprogramming is the art of develop a computer programs treating programs as their data. It means that a program could be designed to read, generate, analyse or transform other programs, and even modify itself while running.  

_"[Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming)" from Wikipedia - CC BY-SA_

In other words, it's programming the programming of your program (code that writes code). Concretely, in JS, we often use it to dynamically apply behavior to objects, as seen below.

It mean we have two programming levels. _**base level**_ (or application level) - that process user input for exemple - and the _**meta level**_ that processes _base level_ code.  
Base and meta level can be different languages that we name respectively programming language (PL) and meta programming language (MPL). In our case JavaScript is used for both.

You probably do metaprogramming every day without notice. Let's take the famous `eval` function: Present since ES1, it's a classic metaprogramming example of code generation (as well as a calamity you should avoid).
It's not obvious but the `for in` operator is also a metaprogramming feature because it allow the program to examine its own structure while running.
It can seem somewhat fuzzy to identify the metaprogramming tools because there is no clear separation between programming constructs and data structures in JS. In fact, all of the `Object.*` methods can be considered metaprogramming functionality.

To go further and unleash the metaprogramming power, ES6 introduce three dedicated APIs: Symbol, Reflect, and Proxy.  

## Symbols  
Symbols are a new [primitive data type](https://en.wikipedia.org/wiki/Primitive_data_type). They are tokens that serve as unique IDs. You create symbols via the factory function `Symbol()`.
Every new Symbol creates a completely new value inside the JavaScript engine. So two symbols will never be equal, even if they have the same description.

```javascript
// The optional description is for debugging purpose only
var symbol1 = Symbol([description]);

console.log(Symbol() === Symbol()); // false
```

### Symbols as Object keys  
You can use symbols as Object keys just like String keys.

```javascript
var myObj = {};
var mySym1 = Symbol();
var mySym2 = Symbol();
var mySym3 = Symbol('hello');
myObj[mySym1] = 'Apple';
myObj[mySym2] = 'Orange';
myObj[mySym3] = 'Cherry';

console.log(mySym1); // Apple
console.log(mySym2); // Orange
console.log(mySym3); // Cherry
```

As you can see, because every Symbol is completely unique, you can assign an unlimited number of them to an object without risking name collisions.

Keep in mind that without the Symbol reference you just can’t access the property. So if you write `myObj[Symbol()] = \"Banana\";`, you threw the key to access to your value.
In addition, Symbols are not enumerable. They cannot be accessed using `for in`, `for of` or `Object.getOwnPropertyNames` but you can use `Object.getOwnPropertySymbols` to get the Symbols within an Object.

```javascript
var myObj = {fruit1: 'Apple'};
myObj['fruit2'] = 'Orange';
myObj[Symbol()] = 'Cherry';

for (var prop in myObj) {
  console.log("myObj." + prop + " = " + myObj[prop]);
  // myObj.fruit1 = Apple
  // myObj.fruit2 = Orange
  // Doesn't log the fruit3 key
}

console.log( Object.getOwnPropertySymbols(myObj) ); // [Symbol()]
```

I know I just said that Symbols are uniques but there is a way to create one that can be re-used: `Symbol.for(myKey)`. This method will search into a global symbol registry with the given key and returns it if found. Otherwise it create a new symbol and register it with the key.
Note that the registry is cross-realm, so a Symbol created this way from an iframe or a different service worker will be accessible by its key from your frame.

```javascript
Symbol.for("cherry") === Symbol.for("cherry"); // true
Symbol.for("cherry") === Symbol("cherry"); // false

iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('cherry') === Symbol.for('cherry'); // true
```

### What are Symbols good for?
You now understand that symbols are just a way to extend object with meta property. Since symbols are unique and cannot be read using existing reflection tools, it make them great to store informations you don’t want access through normal operation. This is a kind of hidden under layer to Objects.  
Just keep in mind that Symbols are not private. It is possible to use the new API `Object.getOwnPropertySymbols(obj)` to list the symbol keys of an object. `Reflect.ownKeys(obj)`, another new API, returns both string and symbol keys.

### Well-known Symbols
Because symbol-keyed properties are new to ES6, they are invisible to pre-ES6 code. It make them ideal for adding new functionality to JavaScript, avoiding conflicts with existing code.
Let's be clear, 'well-known symbols' are far to be well-know. They are _built-ins_, and used to control parts of the language. They are properties of the `Symbol` global object that serve as extension points to configure how ES6 treats an object.
For example, `Symbol.iterator` is a well-known symbol. This method is assign to objects which allows them to be iterated over by returning the default iterator of the object. When you instantiate a `for (var item of myArray)` , it call myArray[Symbol.iterator].

```javascript
var fruits = ['Apple', 'Orange', 'Cherry', 'Banana'];
var iterator = fruits[Symbol.iterator]();

iterator.next().value; // Apple
iterator.next().value; // Orange
iterator.next().value; // Cherry
iterator.next().value; // Banana
iterator.next().value; // undefined
```

You can find all the well-know symbols in the ECMAScript specification [ecma-international.org/ecma-262/6.0/#sec-well-known-symbols](http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols).

### Use cases
#### Put metadata values in an Object
Sometimes we need to stash some extra data on an object (that may belongs to us or a third party library).
Here is how we usually set such flag on an element:

```javascript
element.isDisplayed = true;
```
It seem fine but this solution may lead you to some trouble. For example, our property may collide with other existing or future code or break if a future standard add a `isDisplayed()` method to objects.

Here is where symbols are handy. Because a symbol is unique, attribute a symbol-keyed property to an object allow you to avoid collisions.

```javascript
var isDisplayed = Symbol("isDisplayed");
element[isDisplayed] = true;

// Like any property, you can delete this one
delete element[isDisplayed];
```

#### Represent concepts
At every place we would use a String or Integer as a unique value, we could rather use a symbol.

Let's assume you have fruit library including multiple categories:

```javascript
const ACCESSORY = Symbol('accessory');
const SIMPLE = Symbol('simple');
const COMPOUND = Symbol('compound');
const AGGREGATE = Symbol('aggregate');
const MULTIPLE = Symbol('multiple');
const DEHISCENT = Symbol('dehiscent');
}
```

Unlike strings and integers, symbols are unique values. So there is no mistake possible.
You can use the `switch` statement and refer to the fruit categories using their symbol (`ACCESSORY)` instead of hard-coding them ('accessory').

```javascript
switch (category) {
    case ACCESSORY:
      // ...
    case SIMPLE:
      // ...
    case COMPOUND:
      // ...
    case AGGREGATE:
      // ...
    case MULTIPLE:
      // ...
    case DEHISCENT:
      // ...
    default:
      throw new Exception('Unknown fruit category: '+category);
}
```

A little warning: You can’t coerce (implicitly convert) symbols to strings but you can convert it  explicitly:

```javascript
const sym = Symbol('banana');

const str1 = '' + sym; // TypeError

const str2 = String(sym); // 'Symbol(desc)'
const str3 = sym.toString(); // 'Symbol(desc)'
```

## Conclusion
To summarize, we can say that the main reason for the implementation of symbols have been to allow adding new functionality along to guaranty backward compatibility. But it also give us a new good practice to deal with unique values and extend objects in a way that can't make your code explode.
