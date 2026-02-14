---
layout: post
title:  "The Best Way to Replace All String Occurrences in JavaScript"
date:   2019-10-21 13:46:40
categories: javascript replace string
comments: true
archived: true
---

When you work with strings, common use case is replacing all instances of a given substring. In this article we will explore the available methods, their drawbacks and introduce `replaceAll` as the new standard for such operations.  

While it can address our use case, this would be a workaround with some drawbacks.  
In this article, I will explain them and where does the need for `replaceAll` come into play.

## 1. split() & join()
Another approach to replace all substring occurrences in a string is to use an intermediate array.  

This consist of two steps: Spliting the string by the search string and then, joining the pieces putting the replace string in between:  

```javascript
'Hello World??'.split('?').join('!');
// Hello World!!
```

The drawback of this method is the unnecessary overheads associated with splitting the string and attaching them back together.  Let's continue looking for better alternatives.  

## 2. replace()
The string method `String.prototype.replace(regexp|substr, newSubstr)` returns a new string with some or all matches of a `pattern` replaced. The pattern can be a string or a RegExp.  

In the code below we use the `replace` method to remove the `?` character by a `!`:  

```javascript
'Hello World?'.replace('l', '!');
// Hello World!?
```

As you can see, when the first input parameter is a string, only the first match of the substring gets replaced. The workaround to this problem is to use a regular expression with a global flag:  

```javascript
'Hello World??'.replace(/\?/g, '!');
// Hello World!!
```

> When using regular expressions, you have to escape the following special characters: `- [ ] / { } ( ) * + ? . \ ^ $ |` since they have special meaning.  

You can also make case insensitive replaces by adding `i` flag to the regular expression:  

```javascript
'HELLO World!'.replace(/hello/ig, 'Ahoy');
// Ahoy World!!
```

## 3. replaceAll()
This name of this method is self-explanatory. Added in November 2019, this feature aims at making this operation simple. Line the `replace` method, it takes two arguments, a `pattern`, which can be a string or a regex, and a `string` to replace with.  

Once again, let's replace all occurrences of '?' with '!':  

```javascript
'Hello World??'.replaceAll('?', '!');
// Hello World!!
```

This is the best way to replace all string occurrences in a string and this is now widely [supported](https://caniuse.com/?search=replaceAll).  

## Conclusion
The brut force approach to replace all occurrences is to split the string into chunks by the search string and join them back, adding the replacement string in between. It works, but it's hacky.  

Another approach is to use `replace` with a regular expression with a global flag. The major drawback is that you can't easily generate regular expressions from a string at runtime because the special characters of regular expressions have to be escaped. You may make it work, but using regular expression for this task is overwhelming.  

Finally, the new method `replaceAll` allow you to just does that. Simple and standard.  
