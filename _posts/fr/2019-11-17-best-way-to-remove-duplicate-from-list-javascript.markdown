---
layout: post
title:  "La meilleure technique pour supprimer des doublons dans une liste en JavaScript"
date:   2019-11-17 13:46:40
categories: javascript array reduce
comments: true
archived: true
---

Prenons le tableau suivant:  

```javascript
const fruits = ['banana', 'banana', 'cherry', 'cherry', 'strawberry', 'strawberry'];
```

Il contient deux occurences de chaque élément. Pour supprimer tous les doublons en JavaScript, il y a 4 manières de procéder.

## 1. `includes` and a `for` loop
[`includes`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) est une méthode de l'objet global `Array` qui retourne un boolean indiquant si la valeur passée en argument se trouve ou non dans le tableau.  

```javascript
const uniqueFruits = [];
for (fruit of fruits) {
    if (!uniqueFruits.includes(fruit)) {
        uniqueFruits.push(fruit);
    }
}

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

On peut appliquer la même logique avec un `forEach`:  

```javascript
const uniqueFruits = [];
fruits.forEach((fruit) => {
    if (!uniqueFruits.includes(fruit)) {
        uniqueFruits.push(fruit);
    }
});

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

## 2. Utilisation de `{ }` pour prévenir les doublons
En JavaScript, les clefs d'un objet sont uniques. Nous pouvons en tirer parti en ajoutant nos valeurs comme clefs d'un nouvel objet puis en itérant sur les clefs pour les ajouter dans un nouveau tableau:

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

## 3. Utilisation de `filter` et `indexOf`
[`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) est une méthode de l'objet global `Array` qui retourne un nouveau tableau contenant tous les éléments qui remplissent la condition implémentée dans la fonction de callback:  

```javascript
const uniqueFruits = fruits.filter((value, index, self) => {
    return self.indexOf(value) === index;
});

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

## 4. Utilisation de `Set` (ES6) et de la syntaxe de décomposition (spread syntax)
D'un côté, un objet [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) est une collection de valeurs uniques. A chaque fois que nous ajoutons une valeur a un `Set`, si il la contenait déjà, elle n'est pas ajoutée de nouveau. Les objets `Set` sont également itérables.
D'un autre côté, la [syntaxe de décomposition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), quand elle est utilisée dans un `Array`, permet a un itérable tel qu'un objet `Set` d'être étendu là ou zero ou plus d'éléments sont attendus.  
En d'autres termes, on peut utiliser cette syntaxe pour insérer tous les éléments d'un Set dans un tableau.

```javascript
const uniqueFruits = [...new Set(fruits)];

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```

Alternativement, nous pouvons remplacer l'usage de la syntaxe de décomposition en utilisant `Array.from` pour convertir un `Set`en `Array`:  
```javascript
const uniqueFruits = Array.from(new Set(fruits));

console.log(uniqueFruits); // ["banana", "cherry", "strawberry"]
```
## Conclusion
Une fois que l'on a compris ce qu'est un `Set` et la syntaxe de décomposition, il s'agit de l'approche la plus simple pour prévenir les doublons dans un tabeau. Des divers tests de performance que j'ai trouvé sur le web, il s'agit égallement de la solution la plus efficace.  
