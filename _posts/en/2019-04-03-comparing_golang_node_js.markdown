---
layout: post
title:  "Comparing Golang and Node.js, 10 years later"
date:   2019-04-02 22:01:20
categories: javascript go
comments: true
archived: true
---

<style type="text/css">
i {
    text-align: center;
    display: block;
}

#node-multi-core-scaling {
    max-width: 500px;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>

I've seen a lot of comparaison between Golang and Node.js along with debates about which one is the best. In this post I would like to explain why they have been created, how do they perform, scale and their usage, 10 years after they both came into existence.  

# The Origin Story
First, note that Go is a programming language while Node.js is a JavaScript run-time environment. While both are used for server-side development, the isomorphic nature of JavaScript make the comparison somewhat difficult, especially when talking about popularity.  

## GO
Go is the Google attempt to improve programming productivity when dealing with multicore, networked machines and large codebases. In other words, the goal was to create a modern, more readable and usable, language like Python or JavaScript as opposed to C, C++ and Java with built-in high-performance networking and multiprocessing capabilities. The other goal is to create a language that makes a large codebase easier to maintain.  

## Node.js
Node.js has been designed as an alternative to Apache HTTP Server in order to handle up to 10,000 concurrent connections and more, thanks to a non-blocking low-level I/O API (interaction with the system's disk and network).  

# Performance

The Go raw CPU performance beats Node.js by far but the real life performances are very similar.  
If it's your main concern, know that Go isn't faster than Java on average. Your control over the hardware is limited so if you really want to make the most of it, think about C, C++, Rust, or some other language that gives you appropriate control.  
Obviously, the overall application performance highly depend of the code quality is limited by potential bottlenecks (network, database, …).  

# Scalability
Just like the performance, the overall scalability of an applications doesn't depend only of the programing language but rather to the application architecture used. However, both languages has interesting built-in mechanisms that make it easier to scale an application.  
None is the overall best but one can be better suited for _your_ use case.  

## Node.js
Even if some try to deny it, Node.js has powerful built-in tools for scalability. Using the cluster module you can fork the main application process on every CPU cores available and make them communicate with each other. A simple load balancer would allow you to run your application on multiple machines as well.  

<img src="/assets/posts/2019-04-03-comparing_golang_node_js/node_multi_core_scaling.jpg" alt="Node.js multi-core scaling" id="node-multi-core-scaling" />
<i>One machine, multi-core scaling</i>

<img src="/assets/posts/2019-04-03-comparing_golang_node_js/node_multi_machine_scaling.jpg" alt="Node.js multi-machine scaling" id="node-multi-machine-scaling" />
<i>Multi-machine scaling</i>

## Go
While you have to manage you threads manually with Node.js, Go do it in an automatic fashion. It's called a "Goroutines". If you want to execute a function `hello(name string)` and do `go hello("world")`, the scheduler will automatically schedule this Go routine to the next available thread. This is a great feature to manage concurrency. If this model solve your problem, great! If not, well, that's the only one.  

# Maintainability
This topic is generally overlooked by developers when choosing a programing language. It's commonplace to go with a shiny new technology to build a new project without thinking about the technical debt we will generate. As a company grow, this may become a huge issue, limiting the productivity and reducing motivation. You can do like Netflix, rebuilding everything from scratch every five years, or you can write maintainable code.  
I like to think that maintainability is mainly achieved by good application design and documentation rather than the language or the stack you pick.  

## Go
Google, with it's huge codebase, created a programming language, designed to make it easier to maintain by intentionally leaving out many features of modern object oriented languages:  
- No classes. Everything is divided into packages only. Go has only structs instead of classes.
- No inheritance support.
- No constructors. 
- No annotations. 
- No generics. 
- No exceptions.  

**Advantages**  
If like Google you have a very large code-base and thousands of developers working on it, it will be easier to maintain.

**Disadvantages**  
The absence of exceptions make your code difficult to debug.  
The lack of generic programming may leads to code duplication.  
The lack of some modern language features make it more verbose.  

These omissions are meant to simplify the language but it also makes the abstraction capabilities practically nonexistent. It would be difficult to build more advanced structures than you've already got and the compiler won't help you. Complex projects are forever out of reach by design and it's a choice because complex projects are not easy to maintain. If you need very high-powered abstraction mechanisms, you can use C++, Scala, Haskell, and so on.  

## Node.js
Node.js is not a strong object oriented language neither and that's fine (you can do OOP since ECMAScript 6 introduces JavaScript classes). Its ecosystem is built around the idea of modularity and flexibility. You can use thousand of modules and there is many frameworks like expressjs which are reliable, scalable and flexible. The fact is that JavaScript do not force you by design to write maintainable code. It's up to you to implement the structure that fit your needs and to use good practices.  

# Popularity
The debate about Node.js vs Go in terms of popularity is biased since Node.js isn't a programming language but a cross-platform JavaScript run-time environment. However, we can gain some insight about their communities by comparing JavaScript and Go popularity.  

## Stack Overflow 2018 Developer Survey
Long story short "For the sixth year in a row, JavaScript is the most commonly used programming language." (<a href="https://insights.stackoverflow.com/survey/2018#technology-_-programming-scripting-and-markup-languages" title="Stack Overflow 2018 Developer Survey" target="_blank">source</a>). Go is far behind.

## 2018 State of the Octoverse
There is no place like GitHub to measure the trends of the industry. We can learn a lot on this topic by reading the <a href="https://octoverse.github.com/" title="2018 State of the Octoverse" target="_blank">2018 State of the Octoverse</a> report. They analyzed both public and private repositories to count the number of unique contributors. We can summarize it with one quote: "Today, there are more repositories created in JavaScript than in any other language.".  
This statement hold for every region of the world. Even if Go is growing rapidly, it still didn't entered the top 10 programming languages, unlike TypeScript, breaking out this year. Type safety is a real concern in the developer community and TypeScript operability with JS has been a booster.

## Google trends
Here we can narrow our research to only Node.js rather than JavaScript:

<img src="/assets/posts/2019-04-03-comparing_golang_node_js/node_go_google_trend.jpg" alt="Node.js vs Go Google Trend" id="node-go-trend" />

We can balance this data by adding Python, PHP and Java

<img src="/assets/posts/2019-04-03-comparing_golang_node_js/programming_language_comparaison.jpg" alt="Language Trends" id="language-trends" />

It seems like Node.js and Go are both equally trendy.  

# Real world usage

## Node.js
Node.js is best suited for:  
- Network applications
- i/o tasks
- API server
- Distributed single purpose applications
- Working with data, implement business logic

But doesn't shine for:  
- CPU heavy applications
- Static html based applications 
- Large complicated applications

## Go
Go is very good at:  
- CPU heavy applications
- Project with a large codebase
- Use case where the goroutine model suit your needs

But bad at:
- Project that the goroutine model doesn't suit
- Extend the language
- Functional programming

# Conclusion
One size doesn't fit all. Both Node.js and Go are filling gaps in the industry. The go simplicity is a double edged sword, just like the JavaScript versatility and extensibility. In my opinion the massive and vibrant JavaScript/Node.js community is its greatest strength compared to Go when working on problem that can be solve in both languages.  

I hope this post helped you to get a better understanding of each language usage.  Don't hesitate to share your own use cases in the comments.  
