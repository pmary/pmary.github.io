---
layout: post
title:  "Git rebase vs merge: Benefits, Usage & Dangers"
date:   2019-11-17 13:46:40
categories: javascript array reduce
comments: true
---

Git rebase is a powerfull tool to integrate changes from one branch into another, resulting in a linear commit history while reducing the number of merge conflit than with a simple git merge.  

# Maintaining a clean commit history
`git rebase` helps you maintain a clean and linear commit history. By rebasing your changes onto a target branch, you can effectively incorporate your work as a series of sequential, logical commits. This makes it easier to review, understand, and collaborate with other team members.

Let's take an exemple to explain how `git rebase` is different than `git merge`: Imagine you're working on a feature branch called `killer-feature` based on the `main` branch. The `main` branch has received some updates while you were developing your feature. The history looks like this:  
<div class="mermaid">
gitGraph
       commit id:"A"
       commit id:"B"
       commit id:"C"
       branch killer-feature order: 1
       commit id:"E"
       commit id:"F"
</div>

## Using `git merge`
The steps would be:  
- Switch to the `main` branch: `git checkout main`
- Merge the feature branch into `main`: `git merge killer-feature`

It would results in the following history:  
<div class="mermaid">
gitGraph
       commit id:"A"
       commit id:"B"
       commit id:"C"
       branch killer-feature
       commit id:"E"
       commit id:"F"
       checkout main
       commit id:"D"
       merge killer-feature id:"G"
</div>

The changes from `killer-feature` are merged into `main` as a new commit, creating a merge commit. The commit history will show both the individual commits from feature-branch and the merge commit. While this captures the complete history, it can sometimes result in a cluttered and less readable commit history, especially if the branch has frequent commits or multiple contributors.  

## Using `git rebase`
The steps would be:  
- Switch to the feature branch: `git checkout feature-branch`
- Fetch the latest changes from `main`: `git fetch origin main`
- Rebase the feature branch onto `main`: `git rebase origin/main`. Add the flag `-i` to do it interactively.
- Resolve conflicts: During the rebase, Git might pause and ask you to resolve any conflicts that arise. Use your preferred text editor to open the files with conflicts, resolve them by modifying the code, and then save the changes.
- After resolving conflicts for each commit, use `git add` to mark the resolved files as ready to continue the rebase. Then use `git rebase --continue` to proceed with the rebase. At this point, the history would look like this
<div class="mermaid">
gitGraph
       commit id:"A"
       commit id:"B"
       commit id:"C"
       commit id:"D"
       branch killer-feature
       commit id:"E"
       commit id:"F"
</div>
- Push your changes: Once the rebase is complete, use `git push --force` to push your updated feature branch to the remote repository. The --force flag is necessary because the rebase rewrites the commit history. 
- Remove the now unnecessary feature branch: `git branch -d killer-feature`. Now, the history would look like this:
<div class="mermaid">
gitGraph
       commit id:"A"
       commit id:"B"
       commit id:"C"
       commit id:"D"
       commit id:"E"
       commit id:"F"
</div>

<br>


With `git rebase`, the changes from `killer-feature` are replayed on top of the latest `main` branch commit, one commit at a time. This results in a linear commit history without additional merge commits. Each commit from `killer-feature` is applied on top of the updated main branch, maintaining a clean and sequential history. In summary we just tool a branch and puts it into another.  
This approach provides a clearer and more streamlined view of the feature's development and makes it easier to understand and review the changes.  

# Reducing merge conflicts
Rebasing also helps in reducing the number of merge conflicts that can occur when integrating changes from one branch to another. By replaying your commits on top of the updated target branch, you're essentially applying your changes to the most recent version of the codebase. This reduces the likelihood of conflicts since you're resolving any conflicts as you go, instead of dealing with them all at once during a merge commit.  

# Dangers
It's very important to understand that `git rebase` should be used primarily for feature branches that haven't been shared with others yet. If you've already pushed your branch and others have based their work on it, it's generally better to avoid rebasing to prevent disrupting their work. The reason is that when you rebase, the commit history is changed irreversably. Meaining that it will result in a variety of problems for others since the commits they have locally will no longer exists on the remote which will have an incompatible branch history.  
Bottom line: __no rebase on public branches. Only rebase branches on which only you is working on__.  

# Summary
In summary, `git rebase` helps maintain a clean commit history by incorporating the changes from one branch onto another in a more linear and sequential manner. It avoids the creation of unnecessary merge commits, resulting in a more organized and readable commit history. This can be particularly beneficial when working on feature branches or collaborating with other team members, as it allows for easier code reviews, cherry-picking specific commits, and tracking the development of individual features.  