---
layout: post
title:  "The Broken Ladder: AI Isn't Killing Engineering Jobs. It's Killing Engineering Careers"
date:   2026-02-08 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg'
description: "Why the loudest AI predictions miss the real threat, and what the data actually shows about the future of technical talent."
---
<img src="/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg" alt="The Broken Ladder: AI Isn't Killing Engineering Jobs. It's Killing Engineering Careers" class="grid-fig" />

## The Claim That Launched a Thousand Hot Takes

A few days ago, Mustafa Suleyman, Microsoft's AI chief, told the Financial Times that "most, if not all, professional tasks" will be "fully automated by an AI within the next 12 to 18 months."

Suleyman runs the AI division of a company that has invested over $13 billion in OpenAI. When he says every white-collar task will be automated in 18 months, he's not making a scientific prediction. He's selling. This isn't unique to him. Anthropic's CEO warns AI will wipe out 50% of entry-level jobs. Ford's CEO predicts it will halve white-collar employment. Each prediction comes from someone whose net worth correlates directly with people believing AI is more transformative than it currently is.

We've seen this before. In 2013, Oxford researchers predicted 47% of U.S. jobs were at "high risk" of automation. That number shaped a decade of policy conversation. Nine years later, the U.S. economy had added 16 million jobs. The most rigorous current analysis, from MIT's Daron Acemoglu (2024 Nobel laureate), finds that only about 5% of tasks will be profitably impacted by AI this decade, translating to a GDP boost of roughly 1% over ten years.

So when Suleyman says 18 months, the historically calibrated response is: multiply by five to ten, narrow the scope dramatically. But even the modest, realistic version of AI's impact creates a genuine crisis. Just not the one everyone is talking about.

## What's Actually Happening: The Data Nobody's Debating

I manage a platform engineering team of 11 across three countries. We own SRE, DevSecOps, CI/CD, FinOps, release management, and developer experience. I led the deployment of AI coding tools across our entire 75-person engineering organization. The productivity gains are real and significant.

I'm telling you this so you understand: I am not an AI skeptic. I deployed these tools. I'd do it again.

But I also have a front-row seat to something the macro data is starting to confirm, and it's not the wholesale job elimination that Suleyman promises. It's something more insidious.

### The Entry-Level Collapse

The most striking data point in the entire AI-and-jobs conversation is not about total employment. It's about who is being hired.

Stanford's Digital Economy Lab, analyzing millions of payroll records from ADP, found that employment for software developers aged 22-25 has fallen nearly 20% since late 2022. Right when generative AI tools went mainstream. In those same roles, employment for older, more experienced workers actually increased by 6-9% over the same period.

This is not a general recession effect. It's targeted.

SignalFire tracked a 50% decline in new role starts for people with less than one year of experience across major tech firms. The Burning Glass Institute found that job postings requiring three years of experience or less dropped from 43% in 2018 to 28% in 2024. But here's the critical detail: total job postings in the field stayed flat. Senior-level hiring remained stable. Companies aren't hiring fewer people. They're skipping new graduates entirely.

And here's the number that should keep engineering leaders awake: A 2024 Hult International Business School survey of 1,600 U.S. employers and workers found that 37% of managers would rather use AI than hire a recent graduate. Managers are opting for the tool that doesn't need onboarding.

### The Mid-Tier Squeeze

The entry-level story is dramatic enough. But the mid-tier is where the next wave hits.

Indeed Hiring Lab's July 2025 analysis of the US tech hiring freeze found that declines were "especially sharp among jobs in the middle of the tech wage-spectrum." Specialized developer roles: Android, Java, .NET, iOS, and web developers. All saw job postings drop over 60% compared to early 2020. These aren't entry-level positions. They're the bread-and-butter mid-career roles that form the core of most engineering organizations. 
Software engineer postings overall fell 49%. 
Meanwhile, machine learning engineer postings, the quintessential senior-specialist role, were up 59% from their pre-pandemic baseline.

The mechanism is straightforward. Microsoft reported that 30% of its code is now AI-generated. The tasks that characterize mid-level engineering work (translating requirements into implementations, writing integration code, debugging cross-service issues, producing documentation) are precisely the pattern-matching, translation-style tasks that LLMs handle well. The volume of mid-level work contracts, even as the complexity of what remains increases.

Across all levels, this is accelerated by a quiet "don't backfill" strategy. Klarna's CEO announced the company stopped hiring entirely in 2023, letting natural attrition of 15-20% annually shrink the workforce from 5,000 to 3,500. No layoffs required. Salesforce told CNBC it deployed AI agents that "eliminated the need to backfill support engineer roles." A 2025 Federal Reserve Bank of New York survey quantified the pattern more broadly: while only 1% of service firms reported AI-driven layoffs, 12% said AI had led them to hire fewer workers. The gap between those numbers is attrition-by-design. It doesn't make headlines, but compounded over three to five years, it reshapes the talent pyramid from the middle out.

### The Task Automation Distinction

This is where the optimists get confused: most of what's happening is task automation, not job elimination. A landmark randomized controlled trial by Erik Brynjolfsson and colleagues studying customer support agents found that AI tools boosted productivity by 14% on average, with the largest gains (34%) among the least experienced workers. The agents weren't fired. They handled more cases, faster.

A BCG study of consultants using GPT-4 found similar dynamics: consultants completed 12% more tasks, 25% faster, with 40% higher quality. Again, no jobs eliminated. Just faster output per person.

This sounds like good news, and in many ways it is. But it has a second-order effect that almost nobody discusses: **if AI makes each remaining worker more productive, you need fewer total workers to maintain the same output. And the workers you don't hire are disproportionately the ones at the bottom of the experience curve**.

The net effect is a labor market that still employs plenty of engineers but increasingly only the experienced ones.

## The Broken Ladder: Why This Is Actually a Crisis

The real threat from AI is not mass unemployment. Acemoglu is probably right that the overall impact will be modest and spread over a decade. The real threat is that **AI is systematically destroying the mechanism by which engineers develop expertise**.

### How Engineers Actually Get Good

Every engineering career follows a predictable arc. You start by doing work that's slightly too hard for you, alongside someone who's done it before, on problems that actually matter. You debug code you didn't write. You ship features into systems you don't fully understand. You get woken up at 3 AM by a production incident and learn, under pressure, how distributed systems actually fail.

Matt Beane, an assistant professor at UC Santa Barbara and digital fellow at both Stanford and MIT, spent a decade studying exactly this dynamic. His research, published in venues including Administrative Science Quarterly and Harvard Business Review, culminated in his book The Skill Code. His central finding is that skill development requires three components: challenge (work that stretches you), complexity (exposure to the full messiness of real problems), and connection (working alongside someone more experienced).

Automation systematically undermines all three.

Beane's most vivid example comes from robotic surgery. A surgical resident scrubs into the OR, wheels in her patient, hooks up the robot, and then sits in the corner watching a screen while the attending surgeon operates through the console. The patient receives excellent care. The hospital's efficiency metrics look great. The resident learns almost nothing about how to operate.

The parallel to software engineering is striking. A junior developer asks Claude for help, gets well-structured code, ships it, closes the ticket. Sprint velocity goes up. The engineer never developed the mental model of why that code works, what trade-offs it embeds, or how it will behave under conditions the AI didn't anticipate. The ticket closes faster. The learning doesn't happen.

In my organization, we use a five-level engineering framework (E1 to E5) that tracks growth across four dimensions: technical excellence, delivery and impact, leadership and influence, innovation and strategy. At E1, an engineer "learns" and "follows." By E3, they "master" and "mentor." At E5, they "pioneer" and "envision."

The framework itself isn't special. Most companies have some version of this. What matters is the mechanism by which someone moves from one level to the next.

Every transition on that ladder requires accumulated experience from doing work that's slightly beyond your current capability. An E1 learns to debug by debugging. An E2 learns system design by shipping features into systems they don't yet fully grasp. An E3 earns "senior" not by years of service but by accumulating enough scar tissue from production incidents, architectural trade-offs, and failed approaches to develop genuine judgment.

AI tools can accelerate every one of those transitions. But they can also bypass them entirely. And bypass looks identical to acceleration right up until the moment you need the judgment that only comes from having been wrong.

### The Pipeline Problem

If companies continue cutting entry-level hiring (and the data overwhelmingly says they are) the pipeline narrows at the bottom. If AI handles the learning-grade work that remains for the juniors who do get hired, those juniors develop less depth. If mid-level work contracts as AI handles more of the translation layer, mid-level engineers face slower career progression and weaker skill development.

By 2028 to 2030, organizations will be competing for a shrinking pool of senior engineers who actually understand why things work, not just how to prompt something that makes them work. Brynjolfsson captured this perfectly in the Stanford study: experienced workers are insulated because they possess tacit knowledge: tricks of the trade learned from experience that are never written down anywhere and don't exist in the LLMs' training data.

That tacit knowledge has to come from somewhere. It comes from years of doing the work. The messy, frustrating, unglamorous work that AI is now automating away.

I call this eating the seed corn. Companies are consuming the investment in junior talent development to capture short-term AI productivity gains. The sprint velocity looks great this quarter. The talent pipeline is drying up underneath.

And the cruelest irony: the organizations that cut juniors fastest to capture those gains will be the ones hit hardest by the senior shortage. They saved on the seed corn. Now there's nothing to harvest.

### This Is Not a Theoretical Problem

The signals are already visible in compensation data. Bureau of Labor Statistics figures show the 90th-percentile software developer now earns $211,450, 2.6 times the 10th-percentile wage of $79,850, and that gap widens dramatically at top firms where total compensation for senior and staff engineers routinely exceeds $400,000. Meanwhile, entry-level hiring has collapsed: Ravio's 2025 analysis of European tech found that P1 and P2 hiring rates dropped 73% year-over-year, against an overall hiring decline of just 7%. And PwC's Global AI Jobs Barometer reports that AI-skilled roles now command a 56% wage premium. More than double the 25% premium just one year earlier while general software engineering salaries grew a mere 1.6%.

This is the market pricing in the broken ladder. Juniors are becoming less valuable because their primary output, code, is now abundant and cheap. Seniors are becoming more valuable because their primary asset, judgment, is scarce and getting scarcer.

If you manage engineers, this is the strategic question for the next five years. Not because AI is going to eliminate your team. But because in five years, when you need to replace a departing senior architect, the mid-level engineer who should have been ready for that role won't have developed the depth to fill it. And neither will anyone else's.

## What This Means for Engineering Leaders

The conversation about AI and engineering careers has been captured by two extremes: the Suleymans who promise total transformation in 18 months, and the dismissers who insist nothing has changed. Both are wrong, and both are dangerous.

What's actually happening is subtler and more consequential. AI is not eliminating engineering jobs. It's eliminating the process by which engineers become good at engineering jobs.

The companies that recognize this and treat AI adoption as a career development challenge, not just a productivity play, will build a competitive advantage. Not because their tools are better. Everyone will have the same tools. But because their people will be deeper.

The ladder is breaking. The question is whether you'll notice before your best people have nowhere left to climb.

The answer isn't to stop using AI. It's to stop optimizing for the output you need today and start optimizing for the capability you'll need in five years.

In Part 2, I'll show you how.

## Sources

- Acemoglu, D. (2024). "The Simple Macroeconomics of AI." NBER Working Paper 32487. Published in Economic Policy, Vol. 40(121), 2025.
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Brynjolfsson, E. et al. (2023). "Generative AI at Work." NBER Working Paper 31161.
- Frey, C.B. & Osborne, M. (2013/2017). "The Future of Employment: How Susceptible Are Jobs to Computerisation?"
- Suleyman, M. (2026). Interview with the Financial Times, February 12.
- Amodei, D. (2025). Interview with Axios on AI and entry-level job displacement, May 28, 2025.
- Farley, J. (2025). Remarks at the Aspen Ideas Festival, June 27, 2025.
- Stanford Digital Economy Lab (2025). Working paper on generative AI and early-career employment, analyzing ADP payroll data.
- SignalFire (2025). Entry-level hiring analysis across major tech companies.
- Burning Glass Institute (2024). AI-exposed fields hiring data analysis.
- Bureau of Labor Statistics. Occupation employment data, 2023-2025.
- IEEE Spectrum (2025). "AI Shifts Expectations for Entry Level Jobs."
- CNBC (2025). "AI is not just ending entry-level jobs. It's the end of the career ladder as we know it."
- Forrester (2025). AI adoption and workforce impact report.
- Siemiatkowski, S. (2025). Klarna CEO statements on AI hiring freeze and workforce reduction. CNBC, May 14, 2025; Bloomberg TV, December 2024.
- Salesforce (2025). Spokesperson statements on Agentforce deployment and backfill policy. CNBC, October 2025.
- Abel, J.R. et al. (2025). "Are Businesses Scaling Back Hiring Due to AI?" Federal Reserve Bank of New York, Liberty Street Economics, September 2025.
- Bernard, B. (2025). "The US Tech Hiring Freeze Continues." Indeed Hiring Lab, July 30, 2025.
- Workplace Intelligence / Hult International Business School (2024). Survey of 1,600 U.S. employers and workers on AI and graduate hiring, October 2024.
- Dell'Acqua, F. et al. (2023). "Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality." Harvard Business School Working Paper 24-013.
- Bureau of Labor Statistics (2024). Occupational Employment and Wage Statistics, Software Developers (SOC 15-1252), May 2024.
- Ravio (2025). "The Tech Job Market in 2025." Entry-level (P1/P2) hiring rate analysis.
- PwC (2025). "Global AI Jobs Barometer." AI skills wage premium analysis.