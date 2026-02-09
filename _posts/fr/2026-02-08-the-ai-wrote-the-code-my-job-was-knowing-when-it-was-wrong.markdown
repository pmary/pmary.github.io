---
layout: post
title:  "L'IA a écrit le code. Mon rôle, c'était de savoir quand elle avait tort"
date:   2026-02-08 08:00:40
categories: engineering leadership
comments: true
image: '/assets/posts/2026-02-08-the-ai-wrote-the-code-my-job-was-knowing-when-it-was-wrong/header-illustration.png'
description: "5 heures, 5 000 lignes, zéro ligne écrite par moi, et les décisions humaines qui ont fait fonctionner le tout."
---
<img src="/assets/posts/2026-02-08-the-ai-wrote-the-code-my-job-was-knowing-when-it-was-wrong/header-illustration.png" alt="L'IA a écrit le code. Mon rôle, c'était de savoir quand elle avait tort" alt="L'IA a écrit le code. Mon rôle, c'était de savoir quand elle avait tort" class="grid-fig" />

Un soir en rentrant chez moi une idée m'est venue alors que je traversais le couloir. J'avais lu un PDF sur mon reMarkable Paper Pro plus tôt dans la journée, surlignant des passages, griffonnant des notes dans les marges. Et je me suis dit, encore une fois, que ces surlignages ne servaient à rien. J'utilise Readwise pour agréger les passages surlignés de tout ce que je lis : livres Kindle, articles web, même des artefacts Claude. C'est la colonne vertébrale de mon système de gestion des connaissances. Mais mon reMarkable, l'appareil sur lequel je fais mes lectures les plus approfondies, n'a pas d'intégration Readwise. Les passages les plus intéréssants prenaient la poussière dans un tiroir numérique.

Si seulement Readwise avait une intégration native. Et la révélation : pourquoi ne pas la faire moi-même ?

Je suis engineering manager. Je sais coder. Mais j'ai aussi deux jeunes enfants, un poste à plein temps où je manage 11 ingénieurs, et peut-être 15 à 20 heures de temps libre par mois. Construire un vrai outil CLI de zéro, étudier le format de fichier reMarkable, l'API Readwise, comprendre l'extraction de texte depuis des PDF... Ce sont des semaines de travail que je n'avais pas.

Et puis je me suis souvenu que Claude Code était disponible sur mobile.

Debout dans le couloir, téléphone à la main. J'ai ouvert l'app Claude, je suis allé dans l'onglet Code, connecté un repo vierge, et j'ai tapé :

« Je veux créer une automatisation pour synchroniser les PDF surlignés depuis un reMarkable Paper Pro vers Readwise Reader. Propose un plan. »

Un de mes enfants m'a sauté dans les bras. J'ai posé le téléphone sur la table et j'ai continué ma soirée.  
Quelques minutes plus tard, le plan était prêt. Claude me demandait s'il devait l'exécuter. Sans lire le plan j'ai répondu "oui". Plusieurs minutes de codage autonome plus tard et il avait poussé une première version sur le dépôt.

C'était loin d'être parfait. Mais c'était remarquable vu l'absence de spécifications.

## Ce que l'IA a réussi

Claude a créé un projet Python complet : un outil CLI qui parse les documents PDF du reMarkable, extrait les passages surlignés et les synchronise vers Readwise via leur API.

Certaines choses étaient fonctionnelles dès le départ. L'intégration de l'API Readwise était parfaite du premier coup, avec les bons endpoints, une authentification correcte et des payloads bien structurés. Il a aussi construit une structure de projet pertinente avec de la gestion de configuration, un suivi d'état via SQLite pour éviter les doublons de synchronisation, et une interface en ligne de commande propre.

Quand j'ai signalé que l'extraction des coordonnées de détection des surlignages étaient fausses (mon reMarkable Paper Pro utilise un modèle d'écran différent de celui que Claude avait supposé), il a réussi à rétro-ingénierer le bon système de coordonnées. Les assistants de code IA excellent vraiment sur ce genre de résolution ciblée de problèmes, avec une direction claire.

## Là où il a échoué

### L'API hallucinée

La plus grosse faille était architecturale. Claude a construit l'intégration avec une assurance désarmante autour d'une "API Cloud reMarkable". Sauf que cette API n'existe pas. Il avait confondu un remplacement cloud open source non officiel avec une API officielle et n'a pas trouvé d'alternative viable de lui-même. J'ai dû intervenir et le rediriger explicitement : « oublie l'API cloud, consomme le cache du système de fichiers local depuis l'application desktop installée sur mon ordinateur ».

C'est le genre de défaillance invisible si on ne connaît pas le domaine. Le code était propre, les appels API bien structurés, mais ils pointaient vers quelque chose qui n'existait pas. Un développeur expérimenté repère ça immédiatement. Quelqu'un qui ne connaît pas l'écosystème reMarkable pourrait passer des heures à débugger des erreurs d'authentification avant de réaliser que l'approche toute entière est fausse.

### Le chamboule-tout du parsing

Une fois l'outil fonctionnel, les surlignages synchronisés avaient des problèmes de corruption de texte. Les PDF sont un format visuel qui stocke des glyphes et des positions, pas du texte sémantique. Quand on extrait le texte, on fait de la rétro-ingénierie pour deviner ce que sont les caractères, et plusieurs choses peuvent casser en même temps : les ligatures Unicode transforment « financial » en « fïnancial », des mappings de polices cassés transforment « workflows » en « work)ows », et les retours à la ligne disparaissent si bien que « models will » devient « modelswill ».

Ce qui a suivi est un cas d'école de vision tunnel de l'IA.

Le premier correctif de Claude était une table de remplacement de caractères pour les ligatures. Raisonnable. Puis il a ajouté des regex contextuelles pour les caractères corrompus. Puis plus de 40 patterns regex pour la détection des frontières de mots. Puis une regex sur une seule ligne pour gérer les frontières de majuscules, qui a immédiatement tout cassé en transformant « iPhone » en « i Phone » et « JavaScript » en « Java Script ».

Chaque correctif pris indépendamment était localement rationnel. Chacun rendait le système global plus fragile. Après quatre couches de correctifs en cascade et 199 lignes de regex de plus en plus bancales, j'ai sifflé la fin de la récrée et pointé la solution évidente : « C'est un problème de compréhension du langage. Utilise un LLM. »

Le pivot a été immédiat. Quelques lignes de code envoyant le texte corrompu à Claude Haiku avec le contexte sur les types de corruption, et tous les problèmes étaient résolus : ligatures, frontières de mots, gestion des majuscules, même des patterns de corruption jamais vus auparavant. Coût : des fractions de centime par synchronisation.

J'ai ensuite demandé à Claude de réfléchir à pourquoi il s'était retrouvé coincé. Son auto-évaluation était honnête : « J'étais bloqué dans un état d'esprit de solution déterministe. Quand le premier correctif regex a fonctionné, l'instinct naturel était d'ajouter plus de regex pour le problème suivant. Chaque correctif individuel semblait rationnel et incrémental. Mais l'effet agrégé était un système fragile, cassant, dont la complexité augmentait tandis que la fiabilité diminuait. »

L'ironie ? Le bon outil pour ce problème, c'était lui-même, un LLM. Mais il ne pouvait pas le voir depuis l'intérieur du tunnel des regex.

### La spirale de la dette technique

L'autre pattern que j'ai observé était une négligence systématique de l'hygiène du code. Sur 24 commits en 5 jours, le projet a suivi un arc prévisible :

**Jours 1 à 3 : sprint de fonctionnalités**. Build, build, build. Le commit initial avait des tests en quelques minutes. Belle discipline ! Mais ensuite, la synchronisation des surlignages a été livrée avec 1 735 lignes de nouveau code et aucun test. Le filtrage par tags, le contrôle des catégories, le module de nettoyage LLM : tous livrés sans tests. La gestion d'erreurs consistait en des blocs `except Exception` copiés-collés partout. Des fonctions utilitaires dupliquées dans quatre fichiers. La fonction principale avait atteint 43 branches de complexité cyclomatique.

**Jour 4 : le bilan**. La moitié du travail ce jour-là était de la pure réduction de dette : ajout de l'infrastructure de logging qui aurait dû exister dès le premier jour, écriture des tests pour des fonctionnalités qui tournaient sans jusque là, refactoring du God Object, ajout de définitions TypedDict pour des structures qui étaient de simples dicts depuis le début.

**Jour 5 : corriger les corrections**. Des fichiers de tests cassés pour du code supprimé la veille. Des améliorations du README. Du nettoyage de nettoyage.

Quand j'ai demandé à Claude pourquoi il avait laissé la dette s'accumuler, la réponse était désarmante et franche : « La réponse honnête, c'est que j'optimisais pour la mauvaise chose : le progrès visible. Quand vous me demandez de construire une fonctionnalité, mon comportement par défaut est de livrer cette fonctionnalité. Je traite les tests, la documentation, la gestion d'erreurs et le refactoring comme des préoccupations séparées — des choses à traiter "après" que la fonctionnalité marche. »

## Trois lignes qui ont tout changé

Le quatrième jour, après avoir passé la moitié de la journée à nettoyer une dette qui n'aurait jamais dû exister, j'étais frustré. Pas contre l'IA mais contre moi-même. J'avais les outils qualité configurés. Ruff, mypy, pytest... Tous bien installés dans pyproject.toml comme un abonnement à la salle de sport que personne n'utilise. Mais rien ne les imposait. Je relisais chaque sortie, je validais, et je passais à la fonctionnalité suivante. L'IA optimisait exactement ce que je lui demandais : des fonctionnalités qui marchent. Je n'avais jamais demandé des fonctionnalités testées, documentées, bien structurées. Alors je ne les ai pas eues.

J'ai ajouté un fichier CLAUDE.md à la racine du projet. C'est un fichier que Claude Code lit au début de chaque conversation. Trois lignes : "chaque modification de code doit inclure des tests, lancer pytest avant de commiter, ne jamais utiliser de except Exception générique". La fonctionnalité suivante a été livrée propre. Tests inclus, erreurs gérées correctement, pas de commit de nettoyage nécessaire le lendemain. Trois lignes. C'est tout ce qu'il fallait.

Ensuite j'ai ajouté des hooks de pre-commit. Le fichier de test cassé d'un module supprimé, celui qui était passé inaperçu avant, aurait été détecté en quelques secondes. Pas par ma relecture attentive. Par une vérification automatique qui s'exécute avant chaque commit, le bloquant tant que la suite de tests ne passe pas.

La vraie prise de conscience ne portait pas sur l'outillage. C'était sur la nature de la collaboration. Un assistant de code IA optimise pour l'objectif qu'on lui donne. Si on dit « construis cette fonctionnalité », on obtient une fonctionnalité. Si on encode « construis cette fonctionnalité avec des tests, une gestion d'erreurs propre et de la documentation » dans les instructions permanentes du système, c'est alore ce qu'on obtient. L'IA était tout à faire capable d'écrire des tests. Il lui manquait l'instruction pour les considérer comme faisant partie de la définition d'un travail « terminé ».

C'est une leçon de management déguisée en leçon technique. C'est la même chose que je dis aux nouveaux tech leads : l'équipe optimisera pour ce que vous mesurez et imposez, pas pour ce que vous espérez qu'ils feront spontanément. C'est pour ça qu'on écrit une "Definition of Done". L'IA n'est pas différente. Elle rend juste la boucle de feedback plus rapide et la leçon moins chère à apprendre.

## Les vrais chiffres

Voici ce que ce projet a produit : environ 5 000 lignes de code de production, 3 000 lignes de tests. Un outil CLI entièrement fonctionnel avec du parsing PDF, une intégration reMarkable, une synchronisation API Readwise, une gestion d'état SQLite et un nettoyage de texte par LLM. Avec documentation complète, configuration et gestion d'erreurs.

Temps passé : environ 5 heures.
Temps que passé à écrire du code moi même : environ zéro.

Mon travail consistait à prompter, relire, réfléchir et prendre des décisions. Le moment ou j'ai indiqué « arrête les regex et utilise un LLM ». La virage « oublie l'API cloud, utilise le cache local ». Le recadrage « cette couverture de tests est inacceptable ».

Et le coût ? J'ai tout fait avec mon abonnement Claude. Pas de facturation au token. Sur environ 7 sessions de 10 à 20 rounds chacune, le projet a consommé environ 1,5 million de tokens en entrée et 700 000 tokens en sortie. En tarification à l'usage avec Opus 4.5, ça aurait coûté environ 60 $. Pour un projet qui prendrait 2 à 4 semaines à un développeur humain, 60 $ c'est moins d'une heure de salaire d'un développeur junior. Avec l'abonnement, c'était effectivement 0 $ de plus. Moins de 10 % de ma capacité d'utilisation mensuelle, peut-être 10 à 20 $ d'un abonnement Max. Le vrai coût, c'était mon temps de réflexion et de pilotage.

## La question du développeur junior

Je décrit l'IA se comportant comme « un développeur junior très rapide sans processus de code review ». Cette analogie mérite plus qu'une mention en passant, car je me doute de ce que les gens pensent en la lisant.

Non, ça ne veut pas dire que les développeurs juniors sont obsolètes. C'est plutôt le contraire.

Ce que j'ai observé dans ce projet, c'est que l'IA produit un résultat qui ressemble à du travail de senior : code propre, structure correcte, nommage raisonnable. Mais elle prend des décisions comme quelqu'un qui n'a jamais livré en production. Elle n'anticipe pas les cas limites. Elle ne réfléchit pas à ce qui casse quand les exigences changent. Elle ne remet pas en question en disant « cette approche ne passera pas à l'échelle ». Elle fait exactement ce qu'on lui demande, aussi vite que possible, et passe à autre chose.

Ce n'est pas ce que font les juniors. Eux, ils apprennent. Ils retiennent la leçon de la dernière code review. Ils intériorisent les standards de l'équipe. Ils développent de l'intuition. L'IA repart de zéro à chaque session. C'est un exécutant brillant mais sans mémoire institutionnelle. Ce qui, soit dit en passant, est exactement la raison pour laquelle le fichier CLAUDE.md fonctionne si bien : c'est un substitut à l'apprentissage que l'IA ne peut pas faire toute seule.

Ce que ça change vraiment, c'est le chemin vers la séniorité. Quand j'ai commencé ma carrière, j'ai passé des années à écrire du boilerplate, à débugger des problèmes triviaux et à construire une mémoire musculaire pour la syntaxe des langages. C'était l'apprentissage. Si l'IA gère le boilerplate, l'apprentissage doit se faire autrement : à travers les décisions d'architecture, la conception de systèmes, le débugage des erreurs de l'IA, et le développement du jugement pour savoir quand l'IA a tort malgrès son assurance. Ce qui est automatisée, ce n'est pas « coder ». C'est l'act de taper les lettres. Les compétences qui comptent sont le jugement, l'architecture et la pensée systémique. Elles sont plus difficiles à développer, et elles comptent plus que jamais.

## Ce que ça change pour moi

Je manage 11 ingénieurs et je participe à la transformation IA pour 75 autres. Ce side project n'était pas académique. Il a directement influencé ma façon d'aborder l'adoption de l'IA dans mon équipe.  

Premièrement, je traite l'onboarding des outils IA comme je traiterais l'onboarding d'un nouveau membre d'équipe. Ça veut dire établir des standards avant de lui confier du travail : fichiers CLAUDE.md dans chaque dépôt, hooks de pre-commit imposés dès le premier jour, définitions claires du "done". On ne laisse pas les nouvelles recrues pousser du code non testé. On ne devrait pas laisser les assistants IA le faire non plus.

Deuxièmement, j'investis dans la capacité de nos ingénieurs à diriger l'IA, pas juste à l'utiliser. Les moments les plus difficiles de ce projet ne portaient pas sur le prompting. Ils portaient sur la capacité à reconnaître quand l'IA adressait le mauvais problème. Cela demande une expertise métier profonde. Alors je mets d'avantage l'accent sur les revues d'architecture, les discussions de design systèmes et le mentorat technique. Mieux mon équipe comprend nos systèmes, plus efficacement elle peut aider l'IA à y naviguer.

Troisièmement, je suis honnête sur ce que cela implique pour notre allocation du temps. Si un side project que j'ai construit en 5 heures aurait pris 2 à 4 semaines manuellement, le calcul s'applique aussi à notre travail de production. Pas linéairement, parce que le code de production a plus de contraintes, plus de parties prenantes, plus de cas limites. Mais la direction est claire : le ratio réflexion/frappe a déjà basculé radicalement, et les équipes qui adaptent leurs processus à ce basculement surpasseront celles qui ne le font pas.

Nous n'en sommes qu'au début de la transformation de nos pratiques par l'IA. Je ne sais pas encore si les gains de productivité que j'ai observés sur un side project solo se transposent proprement à une équipe travaillant sur des systèmes de production avec de vrais utilisateurs et de vraies conséquences en cas d'erreur. Mais je sais que l'expérience vaut la peine d'être menée, et je préfère la mener avec des garde-fous en place que de découvrir qu'ils étaient nécessaires après coup.

Le code a été écrit par l'IA. Mais l'outil fonctionne parce qu'un humain tenait la barre.