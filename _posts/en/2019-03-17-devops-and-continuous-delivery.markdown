---
layout: post
title:  "What are DevOps and Continuous Delivery?"
date:   2019-03-17 15:21:40
categories: devops
comments: true
---

<style type="text/css">
img {
    display: block;
    max-width:350px;
    margin-left: auto;
    margin-right: auto;
}
#delivery-pipeline-fig {
    max-width: 120px;
}
</style>

You may have seen "DevOps" used as a job title or to name a team but DevOps is neither a job or a group, it's a set of practices to get more continuous capability in your pipeline. The idea is to allow Developers, Testers and Ops to better work together by breaking the silo between these three teams. It organize the way they work together toward the desired outcome. The focus is on automation in order to increase the velocity of the pipeline.  

<img src="/assets/posts/2019-03-17-devops-and-continuous-delivery/product_pipeline.jpg" alt="Product Pipeline">

The Product Pipeline is how you come from an idea to a released product. As you increase it's velocity you can release faster, learn faster and ultimately, improve your product faster. We can increase its velocity by acting on the steps from the "Code" to "Product release", setting up **Continuous Integration** (CI) and **Continuous Delivery** (CD).  

# It's All About the Delivery Pipeline

CI and CD allow us to build the **delivery pipeline**. Whatever its name, every software company has one. These are the steps to get the application from code to production, whilst ensuring it's quality. Again, the more efficient the pipeline, the faster the delivery to the customer. It evolved a lot over the years, managed by different methodologies like waterfall, agile, kaban… and now DevOps.  

<img src="/assets/posts/2019-03-17-devops-and-continuous-delivery/delivery_pipeline.jpg" alt="Delivery Pipeline" id="delivery-pipeline-fig">

Basically, Developers write their code and push it to a version control system. Automatically, multiple layers of test are run against the software and if everything works fine, the upgrade is automatically deployed in production.  

Tests are run from the fastest to the slowest : Unit Test, Integration Test, System Tests and finally, Acceptance Tests.  

# Impact on the Ops Job

Basically, the Ops job is to create the required resources to run the software on and then keeping that software running. It includes updating it and the packages of the operating systems that support it.  

Pre-DevOps, update a software in production was something like that: Get the binary from the product team, connect to the server and upload it, follow the 42 manual steps and pray to do it all right. Then, repeat the operation on every servers. As you can imagine, that's boring, extremely error-prone and anxiety-provoking.  
The evolution of Ops with DevOps is to create a more standardized and automated infrastructure to do this and being able to update the software constantly.  

To enable it, Ops team will create an infrastructure so the product teams can upgrade their product and make sure it's working by themselves. It generally make economic sense, to work with a serverless infrastructure. Instead of setting up physical servers, they're using a third party provider, like an Amazon Web Service, Google Cloud Platform or Microsoft Azure (or an internal Ops group), to run their software on.  
These providers offer an interface to that allow you to push code without taking care of the highly repetitive grunt work of updating the operating system, pushing new software, and things like that. Ops just have to focus on keeping that overall infrastructure healthy.  

# Impact on the Developer Job

In a DevOps-enabled organization, Devs are more involved in running there software.  
Economic make the relation between them and their running software more immediate because of the democratization of the cloud providers. It changed the relationship between the developer and the tester.  
Unit and integration tests are usually write by developer, especially when adopting a Test Driven Development (TDD) approach, taking your code and slicing it in a small testable pieces, and testing them as you go along. This transition has a lot to do with the spread of Software as a Service.  

# Impact on the Tester Job

Tests are very important. At the software level, it's the only way that we get to an actual continuous delivery capability or even really any kind of substantial continuous integration capability. But what's done by testers now that developers write at least unit and integration tests?  

Not all company do this but there is something called progressive delivery which is increasingly popular. The idea is that we have some infrastructure (usually called a Feature Flag) allowing us to selectively turn on a new features to only a subset of our customers.  
This is the role of the test team to both create the infrastructure as well as manage the deployment of the features.  

The test team also have the job of maintaining the System and Acceptance Tests. 
System tests are drawn from the Black-box idea. We test if a given input result in the expected output.  
There are also specialized types of tests like load, performance or  security tests.
Another prerogative is the regression suite: makes sure that everything works at least the same as it did before.  

The old way of testing was quality assurance or "test last". The idea is that test happens at the very end of the development cycle. We make sure everything's okay before we push into production. It's a more siloed and less continuous approach.  
On the opposite, there is now quality assistance or "test always" which is more consistent with the general idea of DevOps. The testers are embedded with the team or interacting with it thought coaching. It makes sense given the type of software we're working on today, and toward the delivery pipeline.  

# Conclusion
Formalize a delivery pipeline allow the application of the DevOps practices. It's an interdisciplinary approach impacting the developer, tester and ops jobs and progress towards a more continuous capability.  

Don't hesitate to share your particular pipeline in the comments!  