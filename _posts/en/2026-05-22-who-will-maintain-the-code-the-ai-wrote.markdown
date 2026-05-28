---
layout: post
title:  "Who will maintain the code the AI wrote?"
date:   2026-02-23 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote'
description: "The question sounds like a provocation, but it has a structural answer, and the answer is unsettling."
---
<img src="/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote" alt="Who will maintain the code the AI wrote?" class="grid-fig" />

# Who Will Maintain the Code the AI Wrote?

When a developer accepts an AI-generated patch (reads it, runs the tests, ships it) something happens that didn't happen when they wrote the same code by hand. The code enters the repository, but the mental model that would let them debug it at 3 a.m. under load does not enter their head. The artifact is there. The comprehension is not. Multiply this across a team, a quarter, a codebase, and you have a new kind of debt: code that is owned on paper by people who cannot maintain it in practice.

The standard framing treats this as a code-quality problem. AI writes sloppy code, reviewers should be more careful, tooling will improve. That framing is too small. The real claim is structural: **AI code generation creates maintenance debt at a rate that exceeds the rate at which the industry is producing engineers capable of paying it down, and the gap will compound until it becomes a binding constraint on the next decade of software systems.** What follows is the mechanism, the failure mode, the pipeline problem, and the counterarguments worth taking seriously.

In [a previous essay](https://pierremary.com/en/posts/the-programmer-tombstone) I argued that software is facing a reproduction crisis rather than a replacement crisis. That the pipeline producing senior engineers, not the headcount, is what the current wave of AI threatens. This piece traces one specific operational mechanism through which the crisis manifests right now: the maintenance asymmetry the artifact-without-the-model creates, and the people it leaves holding the bag.

## The generation-comprehension asymmetry

Writing code used to be the dominant cost of producing software, and as a side effect, it was also the dominant mechanism by which engineers built mental models of the systems they owned. The two were fused. You couldn't ship a module without internalizing its structure, because the act of typing it out, getting it wrong, rewriting it, and watching it fail in staging was the structure entering your head. The artifact and the model arrived together.

AI generation cleaves them apart. The artifact arrives in seconds; the model would still take days. And because the artifact passes review (it compiles, it tests green, it reads cleanly) there's no forcing function that demands the model also be built. The reviewer's job, as currently constituted, is to verify that the code is plausible, not to demonstrate that they could have written it from scratch or could rewrite it under pressure. These are different bars, and the industry has quietly lowered itself from the second to the first.

The cleanest direct measurement of the gap comes from Anthropic's own January 2026 randomized trial (Shen and Tamkin, "How AI Impacts Skill Formation," arXiv:2601.20245). Fifty-two mostly junior engineers were asked to learn Trio, an unfamiliar Python async library. The AI-assisted group averaged 50% on the post-task comprehension quiz. The hand-coding group averaged 67%. A seventeen-point gap, Cohen's *d* of 0.74 — a large effect. The largest individual gap was on debugging questions. Time savings from the AI condition were about two minutes per task and not statistically significant. The artifact arrived faster, the model arrived later, smaller, and with the largest deficit precisely on the debugging skill that constitutes maintenance. Anthropic's own framing of the result is striking: the company expects agentic coding's impact on skill development to be "more pronounced" than what its own RCT measured. That sentence is the closest thing the industry has to a public concession from a frontier lab that its own tools are interfering with the production of capable maintainers.

Addy Osmani, writing at *O'Reilly Radar* earlier this year, named the phenomenon "comprehension debt" and reported the cleanest field observation of it I've seen. He cited Margaret-Anne Storey describing a student team that hit the wall in week seven of a project where AI generation had carried most of the implementation. They could no longer make simple changes without breaking something unexpected. The problem was not messy code but that no one could explain why design decisions had been made or how the parts of the system fit together. "The theory of the system had evaporated." The students had become managers of code they nominally owned. The fix is to slow down, read the code, ask what you would have done differently. But it depends on a level of discipline that does not survive deadline pressure and does not scale to a team where review queues grow faster than reviewers.

## The failure modes are exactly the ones that need seniors

Here's where the asymmetry becomes load-bearing. AI-generated code does not necessarily fail more often than human-written code (that's an empirical claim and the data is noisy). But it fails differently. The failures cluster in places the generator was statistically unlikely to anticipate: cross-system interactions, implicit assumptions about runtime state, ordering dependencies between services, edge cases that don't appear in the training distribution but do appear at 2 a.m. on the last day of the quarter.

A concrete example from my own team, not about what an AI cannot diagnose, but about how AI-generated code reaches production through a review interface calibrated for a different distribution of bugs. Six months ago, an engineer merged an AI-suggested refactor of a read-through cache that sits in front of a heavily-read service. The diff was tidy. The model's reasoning, in the PR description, was that the cache key was "over-specified," and a smaller tuple would reduce key cardinality without changing behaviour. CI was green; the test suite exercised the same paths it always had; code review approved inside the hour. Two weeks later we caught a class of bugs in which the service was occasionally serving data that was technically valid but stale across a specific kind of state transition. The AI had compressed away the component of the key whose only job was to distinguish state-before from state-after across that transition. The case wasn't in the test suite because the case was rare enough that no one had thought to write a test for it. We had left a three-line comment immediately above the key structure saying, in effect, *do not touch this without reading the 2022 postmortem*. The comment was three lines above the change. The model had not weighted it. The reviewer had not read it.

Diagnosis took an afternoon and required three things in sequence: noticing that the stale responses correlated with the transition rather than with load, remembering that we had hardened the cache key exactly to defend against this class of bug three years earlier, and reading enough of the surrounding code to confirm that the "extra" key component had been deliberately load-bearing. The model's refactor was correct on the artifact. It was wrong on the system. Locally coherent. Globally brittle. A junior engineer following the model's logic would have reached "the cache key is over-keyed, here is a tidier version" and stopped there, never reaching the historical context that explained why the over-keying was the entire point.

That is the failure mode this essay is about. The pattern library a senior engineer carries. *this looks like a race condition I saw in 2019, this smells like a cache invalidation issue, this is the third time I've seen retries collapse on a timestamp-derived idempotency key*. It is exactly what the AI lacks and what the engineer who accepted the AI's code never built. The result is a codebase whose failure surface is shaped by an AI's statistical blind spots and whose maintainers were trained, if they were trained at all, on a different distribution of bugs.

The aggregate telemetry now matches the anecdote. Faros AI's 2026 *AI Engineering Report*, drawn from two years of telemetry across 22,000 developers and 4,000 teams, compared metrics between periods of lowest and highest AI adoption within the same organisations. On that comparison, incidents per PR run 242.7% higher in high-AI-adoption windows than in low-AI-adoption ones; median time in PR review runs 441% longer; and the no-review merge rate (PRs merged with no human or agentic review at all) runs 31% higher. Bugs per developer have widened from a 9% gap in the 2025 report to a 54% gap in 2026 on the same comparison. (Faros is a vendor; the methodological caveat is real; the trajectory shows the negative trends accelerating, not flattening, which is the opposite of what a sales narrative would say.) DORA's 2025 survey of roughly 5,000 engineers and a hundred hours of qualitative interviews showed AI adoption now correlates positively with delivery throughput. A reversal from 2024. Bbut the negative relationship with delivery stability persists. Throughput is improving. Stability is not. The first you can buy back later, the second you cannot.

> Junior engineers feel the pain of bad code. Agents do not. The pain is the pedagogy. Remove the pain by removing the writing and you remove the curriculum.

This is why the "AI will get better at maintenance too" rejoinder is weaker than it looks. The training data for generation is essentially all of GitHub. The training data for maintenance, the actual cognitive process by which a senior engineer narrows a hypothesis space, decides which log to read, remembers which deploy correlated with which symptom, lives almost entirely in human heads and is rarely written down. The benchmark trajectory looks deceptively strong: top systems now score above 80% on SWE-bench Verified, up from 4.4% in 2023. But a 2026 contamination study (SWE-ABS, arXiv:2603.00520) found that 19.71% of cases the top-thirty agents had labelled "solved" were semantically incorrect. Patches passing weak tests without actually fixing the issue. On the harder SWE-Bench Pro, the same top system that scores 78.80% on Verified drops to 45.89%. Models are improving at maintenance, and the gap may eventually close. The data asymmetry is structural, not transient, and the labs are quieter about it than they are about benchmark scores.

## The pipeline that produced maintainers is the pipeline being cut

The cohort that would, in the old regime, have built diagnostic capability by maintaining their own bad code is now generating new AI code instead. The mechanical apprenticeship by which the suffering loop produce senior judgment is being short-circuited at exactly the moment the system most needs its outputs. Juniors who reach for the agent before the textbook, who ask Claude to explain the paper instead of reading it, who one-shot the ticket and push for review without understanding what the tool decided, are not lazy. They are responding rationally to incentives. The incentive structure rewards shipped tickets, not internalized models.

Senior diagnostic judgment — in radiology as in engineering — is the same cognitive operation: narrowing a hypothesis space by recognising patterns that don't match the learned baseline, and that capacity is built by doing the work without the model, repeatedly, until the patterns are in the head. The cleanest published evidence of what happens when that work is partially substituted comes from a 2023 study by Chassagnon and colleagues at Cochin Hospital (*European Radiology*). Eight radiology residents read 500 chest X-rays each in three phases: 150 baseline reads, then 200 reads with an AI second-reader for half the cohort, then a final 150 reads with the AI removed for everyone. During the AI-assisted phase, the AI-using group outperformed controls on sensitivity, specificity, and accuracy at *p* < 0.001. After the AI was removed, the difference vanished entirely: sensitivity 44% vs 46% (*p* = 0.666), specificity 90% vs 90% (*p* = 0.642), accuracy 80% vs 80% (*p* = 0.955). The authors' conclusion lands directly on the maintenance-pipeline question: AI improved performance during use, but it "cannot be used alone as a learning tool" and cannot replace dedicated teaching. It is a small study (*n* = 8), and a 2025 Brescia follow-up reads more positively in some dimensions. But the cleanly null durable-skill-transfer finding is the strongest published primary evidence in any adjacent field for what AI-assisted apprenticeship actually produces.

The labour-market data is consistent with the same picture. Brynjolfsson, Chandar, and Chen's November 2025 Stanford Digital Economy Lab paper, "Canaries in the Coal Mine?", found that headcount of US software developers aged 22–25 has fallen 20% since October 2022, while older developers in the same occupations are unchanged. SignalFire's 2025 *State of Talent Report* puts new graduates at 7% of Big Tech hires — down 25% from 2023 and more than 50% from pre-pandemic levels.

The consequence is a concentration effect that is already visible to anyone running an engineering organization honestly. Maintenance burden falls on a shrinking number of engineers who still understand the increasingly complex codebases. Stack Overflow's 2025 survey of roughly 49,000 developers across 177 countries captures the cohort split with embarrassing clarity: 84% are using or planning to use AI tools, up from 76% a year earlier; 46% don't trust the accuracy of AI output, up from 31%. Among experienced developers — the cohort that does most of the production maintenance work — only 2.6% report "high trust" in AI output, while 20% express strong distrust, the widest cohort gap in the survey. The seniors who do the careful work get drowned; those who wave it through get rewarded for throughput. Left unchecked, the dynamic ends with the careful reviewers either capitulating or leaving, and the codebase losing its last readers. This is not a forecast. It is the pattern multiple engineering leaders are now describing in survey data, in conference talks, in the quiet conversations that don't make it into the keynote.

## The counterarguments worth taking seriously

The strongest objection is that models will close the maintenance gap themselves. Long-context reasoning improves; cross-file comprehension improves; debugging benchmarks fall. By the time the current senior cohort retires, the argument goes, models will read codebases as well as the seniors did. This is possible, and it is the only counter that deserves real engagement. The strongest empirical pushback is METR's randomized controlled trial published in July 2025 (Becker, Rush, Barnes, Rein, arXiv:2507.09089), which paired sixteen experienced open-source developers with Cursor and Claude 3.5/3.7 Sonnet on 246 tasks in their own mature repositories. Developers predicted a 24% speedup. After the experiment, they believed AI had sped them up by 20%. Measured: 19% *slower*. The slowdown was largest for developers with the deepest repository familiarity — that is, for the seniors. METR's February 2026 follow-up softened the picture: a larger but more selection-biased sample produced a –4% estimate with a confidence interval from –15% to +9%, and METR concluded that participants were "likely more sped up" in early 2026 than in early 2025 but that the experimental design could no longer measure the effect reliably. Hold both findings honestly. The 2025 result is consistent with "AI demonstrably slowed seniors in mature codebases." The 2026 update is consistent with "we no longer have a clean number." Neither is consistent with the original claim that AI is producing the kind of step-function maintenance capability that would close the senior gap on the timeline executives are making headcount decisions against.

The continuity counter is more honest: software has always had unmaintained code. COBOL still runs banks. Legacy Java still runs insurance. The maintenance burden is not new; AI just shifts who carries it. This is partly right and worth conceding. But the shift in scale matters. Previous unmaintained code accumulated over decades and was bounded by the rate at which humans could write it. Sundar Pichai now puts the AI-generated share of new code at Google at over 75%; Satya Nadella put Microsoft's at 20–30% in April 2025; Anthropic is described by Pichai as "nearly 100%." AI-generated code accumulates at a multiple of the previous rate, and the cohort capable of maintaining it is shrinking rather than growing. The flow exceeds the drain in a way it did not before. And the modern reader's reflex defence — "yes, but my tests catch regressions like that" — is the COBOL maintainer's confidence applied to a different measurement. The SWE-ABS finding cited earlier is the reply: AI is producing patches that pass weak tests at meaningful rates while being semantically wrong. COBOL at least failed loudly. AI-generated debt sits under green CI until the behaviour drifts past whatever the test suite actually exercises, which is operationally worse because nobody notices in time. The COBOL precedent also offers a darker reading of the market-correction argument. COBOL maintainers are old (average age 55), scarce, and load-bearing for 43% of US banking systems, 95% of ATM transactions, and roughly $3 trillion in daily commerce. Their compensation, per Salary.com and ZipRecruiter, runs roughly $80,000 to $186,000 at the 90th percentile. The market has chronically under-paid the maintainers of critical infrastructure for twenty-five years without producing the wage signal that should have rebuilt the cohort. Scarcity of maintenance capability can persist for decades without efficient market correction.

The market-solves-it counter — senior wages rise, entrants flood in, equilibrium restores — assumes a labour-market correction cycle shorter than the damage cycle. It is not. Senior engineers take ten years to produce. AI-generated code accumulates in quarters. By the time the wage signal is loud enough to redirect career choices, the codebases that needed those engineers have already entered failure modes that no amount of compensation will fix retroactively. The strongest counter-evidence to the market-solves frame comes from inside the AI industry itself. When Google blocked OpenAI's $3 billion bid for Windsurf in mid-2025 by reverse-acquihiring its leadership for $2.4 billion, Cognition stepped in and acquired the brand, the $82M-ARR enterprise business, and all remaining employees — and explicitly structured the deal around retention. One hundred percent of Windsurf employees received fully accelerated vesting; vesting cliffs were waived. The IP without the institutional-knowledge holders was, by the acquirer's revealed preference, insufficient. M&A is now treating maintenance capacity, not code, as the binding constraint. If even the AI-native firms behave this way when they have the chance to set price, the market-solves-it counter is doing less work than it appears.

## What the consequences already look like

The implications are not speculative; several are legible right now if you know where to look. Incident mean-time-to-recovery is the leading indicator: in AI-heavy codebases, it should be degrading, and where measurement exists, it is. Faros AI's 2026 figures put incidents per PR up 242.7% and monthly incidents up 57.9% on the same low-to-high adoption comparison. DORA's 2025 stability finding persists despite the throughput reversal. Bus-factor risk concentrates on specific named individuals whose departure produces acute crises that headcount cannot smooth over. Companies bifurcate into "we have the seniors" and "we don't," and this is the real two-tier system — at the firm level, not the engineer level. M&A due diligence will start asking about maintenance capacity the way it currently asks about ARR; the Cognition–Windsurf structure is the early form of the same question. Most acquirers do not yet know to ask: not "who wrote this code" but "who, by name, could rewrite it under load."

If you are running an engineering organization, these are the questions worth forcing your leadership team to answer, out loud, this quarter.

- **What's the MTTR trend on AI-heavy versus AI-light code areas, and which engineers are absorbing that load?**

- **What percentage of your codebase is owned by someone who couldn't rewrite it from scratch under load?**

- **Where is your bus-factor risk concentrated, and what's your succession plan if that person leaves in the next six months?**

- **How much of your engineering time this quarter went to maintaining code that nobody on the team fully understood when it shipped, and is that share rising?**

None of these questions requires you to take a position on whether the next benchmark will fall or the next senior cohort will arrive on time. All of them compound.

The question in the title was rhetorical, but it has an answer that is not. The maintenance asymmetry is the reproduction crisis viewed at the level of the codebase. On current trends, the people who will maintain the code the AI wrote are the same finite cohort who could already maintain code before the AI existed — and there are fewer of them every year. The consequences arrive on a timeline shorter than the labour market's correction cycle, which means the correction, when it comes, will come through failures rather than through hiring. Whether your organisation is on the failure side or the maintenance side of that line is being decided right now, in the headcount decisions and the tooling decisions and the quiet erosion of code review. None of these carries the label of the decision it actually is.

---

## Sources

### Skill formation and comprehension

- Shen, J. H. & Tamkin, A. (January 28, 2026). "How AI Impacts Skill Formation." Anthropic. arXiv:2601.20245.
- Osmani, A. (February 2026). "Comprehension Debt: The Hidden Cost of AI-Generated Code." *O'Reilly Radar*.
- Storey, M.-A., as cited in Osmani (2026).

### Production telemetry and stability

- Faros AI (2026). *AI Engineering Report 2026: Acceleration Whiplash*.
- Faros AI (July 2025). *The AI Productivity Paradox Report*.
- DORA / Google Cloud (2024). *Accelerate State of DevOps Report*.
- DORA / Google Cloud (2025). *State of AI-Assisted Software Development*.
- GitClear (February 2025). *AI Copilot Code Quality: 2025 Data*.

### Productivity randomized trials

- Becker, J., Rush, N., Barnes, E., & Rein, D. (July 2025). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." METR. arXiv:2507.09089.
- Becker, J., Rush, N., Cunningham, C., Rein, D., & Mahamud, S. (February 24, 2026). "We are Changing our Developer Productivity Experiment Design." METR blog.

### Benchmark contamination

- Yu, B., Cao, Y., et al. (February 2026). "SWE-ABS: Adversarial Benchmark Strengthening Exposes Inflated Success Rates on Test-based Benchmark." arXiv:2603.00520.
- Jimenez, C., et al. (2023). SWE-Bench Verified, Princeton NLP / OpenAI.

### Developer sentiment

- Stack Overflow Developer Survey (2024; 2025).

### Labour market

- Brynjolfsson, E., Chandar, B., & Chen, R. (November 2025). "Canaries in the Coal Mine? Six Facts About the Recent Employment Effects of Artificial Intelligence." Stanford Digital Economy Lab.
- SignalFire (May 20, 2025). *2025 State of Talent Report*.
- US Bureau of Labor Statistics. *Occupational Outlook Handbook 2025–26*, Software Developers.

### Cross-disciplinary apprenticeship analog

- Chassagnon, G., Billet, N., Rutten, C., et al. (November 2023). "Learning from the machine: AI assistance is not an effective learning tool for resident education in chest x-ray interpretation." *European Radiology* 33(11):8241–8250.
- Savardi, M., et al. (January 2025). "Upskilling or deskilling? Measurable role of an AI-supported training for radiology residents." *Insights into Imaging*.

### M&A and the value of institutional knowledge

- Cognition AI blog (July 14, 2025). "Cognition acquires Windsurf."

### Counterargument data

- Pichai, S., Alphabet Q1 2025 earnings call and late-2025 blog post.
- Nadella, S. (April 29, 2025), Meta LlamaCon.
- Salary.com COBOL Programmer salary data (March 2026); ZipRecruiter (May 2026).
- COBOL critical-infrastructure footprint: Reuters (2017); Open Mainframe Project; Micro Focus / Vanson Bourne (2022).