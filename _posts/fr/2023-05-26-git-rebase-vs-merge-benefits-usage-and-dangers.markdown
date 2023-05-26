---
layout: post
title:  "Git rebase vs merge: Bénéfices, Usage & Dangers"
date:   2019-11-17 13:46:40
categories: javascript array reduce
comments: true
---

Git rebase est un outil puissant pour intégrer les changements d'une branche dans une autre, ce qui permet d'obtenir un historique de commits linéaire tout en réduisant le nombre de conflits de fusion par rapport à une simple fusion avec `git merge`.  

# Maintenir un historique de commits propre
`git rebase` vous aide à maintenir un historique de commits propre et linéaire. En réappliquant vos modifications sur une branche cible, vous pouvez incorporer votre travail sous la forme d'une série de commits séquentiels et logiques. Cela facilite la revue, la compréhension et la collaboration avec les autres membres de l'équipe.

Prenons un exemple pour expliquer la différence entre `git rebase` et `git merge`: Imaginez que vous travaillez sur une branche de fonctionnalité appelée `killer-feature` basée sur la branche `main`. La branche `main` a reçu des mises à jour pendant que vous développiez votre fonctionnalité. L'historique ressemble à ceci :
<div class="mermaid">
gitGraph
       commit id:"A"
       commit id:"B"
       commit id:"C"
       branch killer-feature order: 1
       commit id:"E"
       commit id:"F"
       checkout main
       commit id:"D"
</div>

## Utilisation de `git merge`
Les étapes seraient les suivantes :  
- Basculer sur la branche `main` : `git checkout main`
- Fusionner la feature branch dans `main`: `git merge killer-feature`

Cela donnerait l'historique suivant :  
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

Les modifications de la branche `killer-feature` asont fusionnées dans `main` sous la forme d'un nouveau commit, créant un commit de fusion. L'historique des commits montrera à la fois les commits individuels de la branche de fonctionnalité et le commit de fusion. Bien que cela reflète l'historique complet, il en résulte un historique des commits encombré et moins lisible, surtout si la branche comporte de fréquents commits ou qu'il y a plusieurs contributeurs.  

## Utilisation de `git rebase`
Les étapes seraient les suivantes :  
- Basculer sur la feature branch : `git checkout feature-branch`
- Récupérer les derniers changements de `main` : `git fetch origin main`
- Effectuer un rebase de la branche de fonctionnalité sur `main` : `git rebase origin/main`. Ajoutez le flag `-i` pour lancer une session interractive.
- Résoudre les conflits : Pendant le rebase, Git peut s'arrêter et vous demander de résoudre les conflits qui surviennent. Utilisez votre éditeur de texte préféré pour ouvrir les fichiers en conflit, résolvez-les en modifiant le code, puis enregistrez les modifications.
- Après avoir résolu les conflits pour chaque commit, utilisez `git add` pour marquer les fichiers résolus comme prêts à poursuivre le rebase. Ensuite, utilisez `git rebase --continue` pour continuer le rebase. À ce stade, l'historique ressemblerait à ceci :
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
- Poussez vos modifications : Une fois le rebase terminé et que vous êtes satisfait des modifications, utilisez `git push --force` pour pousser votre branche à jour vers le repository distant. L'option `--force` est nécessaire car le rebase réécrit l'historique des commits.
- Supprimez la feature branche devenue inutile : `git branch -d killer-feature`. Maintenant, l'historique ressemblerait à ceci :
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

Avec `git rebase`, les modifications de la branche `killer-feature` sont rejouées sur le dernier commit de la branche `main`, un commit à la fois. Cela donne un historique de commits linéaire sans commits de fusion supplémentaires. Chaque commit de la feature branch est appliqué devant la branche `main` à jour, créant ainsi un historique propre et séquentiel. En résumé, nous avons simplement pris une branche et l'avons placée dans une autre.
Cette approche offre une visualisation plus claire et plus fluide du développement de la fonctionnalité, ce qui facilite la compréhension et la revue des modifications.  

# Réduction des conflits de fusion
Le rebase contribue également à réduire le nombre de conflits de fusion pouvant survenir lors de l'intégration des changements d'une branche dans une autre. En rejouant vos commits sur la branche cible mise à jour, vous appliquez vos modifications à la version la plus récente de la base de code. Cela réduit les risques de conflits, car vous les résolvez au fur et à mesure, plutôt que d'avoir à les traiter tous en une seule fois lors d'un commit de merge.  

# Dangers
Il est très important de comprendre que git rebase doit être utilisé uniquement pour les branches qui n'ont pas encore été partagées avec d'autres. Si vous avez déjà poussé votre branche et que d'autres se sont basés sur votre travail, il est généralement préférable d'éviter de rebase pour ne pas perturber leur travail. La raison en est que lors du rebase, l'historique des commits est modifié de manière irréversible. Cela peut entraîner divers problèmes pour les autres, car les commits qu'ils ont en local n'existeront plus dans le repo distant, ce qui entraînera une incompatibilité de l'historique des branches.
En résumé : ne pas utiliser le rebase sur des branches publiques. Utilisez le rebase uniquement sur des branches sur lesquelles vous êtes le seul à travailler.  

# Conclusion
En résumé, `git rebase` permet de maintenir un historique de commits propre en incorporant les changements d'une branche dans une autre de manière plus linéaire et séquentielle. Cela évite la création de commits de fusion inutiles, ce qui se traduit par un historique de commits plus organisé et plus lisible. Cela peut être particulièrement bénéfique lors du travail sur des branches de fonctionnalité ou de la collaboration avec d'autres membres de l'équipe, car cela permet des revues de code plus faciles, la sélection de commits spécifiques et le suivi du développement de fonctionnalités individuelles.