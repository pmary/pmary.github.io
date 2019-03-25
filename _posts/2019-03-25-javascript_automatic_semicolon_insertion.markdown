---
layout: post
title:  "JavaScript Automatic Semicolon Insertion Explained"
date:   2019-03-25 22:01:20
categories: javascript
comments: true
---

> Disclaimer : This post is not about the silly debate between pro and anti-semicolon. It aims to explain how the "Rules of Automatic Semicolon Insertion" (ASI) works. Regardless on your semicolon usage, you must know this rules to write JavaScript professionally and read any code regardless of how it's written.

# The rules
To sum up the [specification](http://es5.github.io/#x7.9.1), you can, for convenience, omit a semicolon in JavaScript since they are automatically inserted by the compiler. To understand where and why, take a look at the following cheat sheet:

<img src="/assets/posts/2019-03-25-javascript_automatic_semicolon_insertion/ASI_cheat_sheet.jpg" alt="ASI cheat sheet" id="asi-fig" />

The first thing to notice is that semicolon are not optional everywhere but only where there is a line break, a closing brace, or at the end of the program. Between statements appearing on the same line, you must insert a semicolon by yourself to avoid a syntax error. For example:

```javascript
if(a) { b() }
```

The expression statement `b()` should be terminated by a semicolon, but it's optional even though there is no line break since the next token is a closing brace. But if you write:  

```javascript
var a = 1 var b = 2
```

Rather than:  

```javascript
var a = 1; var b = 2;
```

You will have a syntax error.  

One more thing, a line break can't replace a semicolon between statements when both can be parsed as part of the same statement:  

```javascript
// this:
a = b + c 
(d + e)
 
// becomes this:
a = b + c(d + e)
```

To prevent any potential ambiguity you can either insert a semicolon at the end of the preceding statement or at the beginning of the new line.  

# Restricted Productions

A restricted production is a case where there is a line break (`\n`) immediately after a ++ or -- as a postfix operator or a return, throw, break, or continue statement. In such case, a semicolon will **always** be inserted. If you are not aware of it, your code may be interpreted in a way you didn't expect.  

**Examples**  

```javascript
// this:
return
a + b 
 
// becomes this:
return; a + b;
```

*Note that This code is syntactically incorrect anyway so this restricted production shouldn't be an issue.*  

A more error-prone situation would be when you define multiple variables and omit a comma after the `a` variable:  

```javascript
// this:
var a = 1
  b = 2
 
// becomes this:
var a = 1;
  b= 2;
```

Here, `b` is declared on the global scope (which is not valid in strict mode).  

## Two overriding conditions

There is two edge cases where the restricted production rule is not applied:  
- The added semicolon would become one of the two semicolons in the header of a `for` statement: No automatic insertion between the parenthesis of a `for` statement.
- The inserted semicolon would then be parsed as an empty statement.

The later mean that the following code snippet will not change:

```javascript
for (var i = 0; 
  i < 10; 
  i++)
```

Remember that `;;;` is a perfectly valid JavaScript program consisting of three empty statements. Therefore, since the automatically added semicolon after the `)` would be parsed as an empty statement, it's not inserted.  

# Common misconceptions

I hope you gain a better understanding of the ASI rules by now and I would like to point out two common misconceptions:  

**"Use semicolons everywhere protect you from compatibility issues"**  
This is false. The rules given by the specification are implemented everywhere. Any bugs that may have existed years ago are long since fixed.  

**"Minify without semicolon break the code"**  
Let's be serious. If my semicolon-free code works with every JavaScript implementation but *break* when using your minification tool this is because your tool is broken.  

# Conclusion
Which style is better? The answer is a matter of personal preference, just be sure to make an informed choice. Remember the rules and you will have no fear of unknown syntactical traps or nonexistent bugs.  
Personally, I recommend the semicolon-free style because it requires you to get a real understanding of the language. If you work on production grade, you want to understand how statements in JavaScript are terminated.