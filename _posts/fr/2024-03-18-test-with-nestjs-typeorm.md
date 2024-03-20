---
layout: post
title:  "Tester une API REST NestJS / TypeORM"
date:   2024-03-18 09:00:40
categories: management leadership
comments: true
---

# Introduction

Vous êtes un débutant en tests et en NestJS ? Cet article est pour vous ! 

# Mettre en place l'environnement de dev local:

1. Installer Node.js LTS : `nvm install --lts`
2. Installer NestJS CLI : `npm i -g @nestjs/cli`
3. Créer un nouveau projet NestJS : `nest new back` et choisir `npm` comme package manager
4. [Optionnel] Pour accélérer les builds, nous pouvons utiliser [SWC](https://docs.nestjs.com/recipes/swc) (Speedy Web Compiler), une plateforme Rust approximativement 20x plus rapide que le compiler TypeScipr par défaut:
```shell
npm i --save-dev @swc/cli @swc/core
```
Then, add the following to your `package.json` scripts:
```json
"scripts": {
  "start:dev": "npm run start -- -b swc --watch"
}
```

L'option `--watch` permet de faire du hot-reload : Modifier un fichier relancera les test.  

## Structure du projet

Voici un bref apperçu des fichiers principaux :  

- `app.controller.ts` : Un controller basique avec une seule route
- `app.controller.spec.ts` : Les tests unitaires du controller
- `app.module.ts` : Le module racine de l'application
- `app.service.ts` : Un service basique avec une seule méthode
- `main.ts` : Le point d'entrée de l'application qui utilise la core function `NestFactory` pour créer l'instance de l'application Nest

## Démarrage et exécution des tests
Un nouveau projet NestJS embarque [Jest](https://jestjs.io/) comme librairie de test par défaut, vous n'avez pas besoin d'installer quoi que ce soit d'autre pour commencer, sauf cas d'usage spécifique.  

Avant de toucher à quoi que ce soit, nous pouvons lancer le test auto-généré afin de nous assurer que tout fonctionne correctement :  
```bash
npm run test
```
Vous devriez obtenir le résultat suivant, indiquant que le test a été passé avec succès :
```bash
back@0.0.1 test
> jest

 PASS  src/app.controller.spec.ts
  AppController
    root
      ✓ should return "Hello World!" (6 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.975 s
```

En parallèle, vous pouvez égallement lancer l'application avec la commande :
```
npm run start:dev
```

En ouvrant l'url `http://localhost:3000/` sur votre navigateur, vous devriez vous le message `Hello World!` s'afficher.

# Cas simple (pas de mocking)

Nous allons commencer par créer un service avec des fonctionalités CRUD basiques pour gérer une exposition dans un musé puis écrire quelques tests pour ceux-ci.  

Créons d'abord un module nommé `exhibitions` :  
```bash
nest g module exhibitions
```
Puis ajoutons un service exhibitions:  
```bash
nest g service exhibitions
```
Ces deux commandes vont créer un dossier nommé `exhibitions` contenant 3 fichiers :  
```
src/
 |- exhibitions/
  |- exhibitions.modules.ts
  |- exhibitions.service.spec.ts
  |- exhibitions.service.ts
```

Assurez vous de lancer les tests en local avec la commande suivante :
```bash
npm run test:watch
```
Ainsi, les changements que vous ferez relancerons les tests.  

## Anatomie d'un test

Ouvez le ficher `exhibitions.service.spec.ts`. Il devrait ressembler à ceci:  
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionsService } from './exhibitions.service';

describe('ExhibitionsService', () => {
  let exhibitionsService: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();

    exhibitionsService = module.get<ExhibitionsService>(ExhibitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

Le fichier commence par un bloc `describe` :  
```ts
describe('ExhibitionsService', () => {
  // ...
}
```
On y regroupe les tets liés au même objet, ici, le `ExhibitionsService`.  

Ensuite, nous avons le hook `beforeEach` :  
```ts
describe('ExhibitionsService', () => {
  let exhibitionsService: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();
    
    exhibitionsService = module.get<ExhibitionsService>(ExhibitionsService);
  });

  // ...
}
```
Un hook `beforeEach` permet de prendre en charge tout ce qui doit être effectué avant l'exécution de chaque test.  
Dans cet exemple, il utilise la class native NestJS `Test`pour créer un environnement d'exécution NestJS isolé afin que vous puissiez disposer de tous les comportements de NestJS comme l'injection de dépendance.  

Cet environnement d'exécution est limité à ce que vous définissez quand vous utilisez la classe `Test`. Ici, juste le `ExhibitionsService`. Nous donnant ainsi accès à toutes ses méthodes.  

Enfin, nous avons un bloc `it`, représentant un test appellé `should be defined` :
```ts
describe('ExhibitionsService', () => {
  // ...

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```
Il contient une assertion utilisant la fonction `expect` de Jest. Cette fonction aura toujours une autre méthode chainée qui sert à vérifier que la condition est remplie. Dans cet exemple il s'agit de la méthode `toBeDefined()`. Ce test s'assure donc que `ExhibitionsService` est définit.  

## Tester de nouvelles méthodes (sans mocking)

Ajoutons de nouvelles méthides dans `exhibitions.service.ts` :  
```ts
import { Injectable } from '@nestjs/common';

type Exhibition = {
  id: number
  name: string
}

@Injectable()
export class ExhibitionsService {
  exhibitions: object[] = [];
  
  createExhibition(exhibition: Exhibition) {
    this.exhibitions.push(exhibition);
    return exhibition;
  }

  getExhibitions() {
    return this.exhibitions;
  }

  updateExhibition(id: number, exhibition: Exhibition) {
    const exhibitionToUpdate = this.exhibitions[id];

    if (!exhibitionToUpdate) {
      throw new Error(`This Exhibition does not exists`);
    }

    this.exhibitions[id] = exhibition;
  }

  deleteExhibition(id: number) {
    const exhibitionToDelete = this.exhibitions[id];

    if (!exhibitionToDelete) {
      throw new Error(`This Exhibition does not exists`);
    }

    const deleteExhibition = this.exhibitions.splice(id, 1);
    return deleteExhibition;
  }
}
```

Pour garder cet exemple simple, vous remarquerez que nous gérons le state en mémoire. Nous verrons plus loin comment le gérer via une base de donnée et ce que cela implique pour nos tests.  

Considérons le fait de tester `createExhibition()`. Pour savoir quoi tester, Nous devons nous poser les questions suivantes :  
- Quel est le comportement attendu ?
- Y-a-t-il plusieurs résultats possibles ?

En ce qui concerne `createExhibition()`, nous pouvons répondre :  
- Quand une exposition valide est créée, elle est ajoutée au `state`
- Quand une exposition valide est créée, la méthode retourne l'exposition

Dans le fichier `exhibitions.service.spec.ts`, ajoutons notre premier test :  
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionsService } from './exhibitions.service';

describe('ExhibitionsService', () => {
  let exhibitionsService: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();

    exhibitionsService = module.get<ExhibitionsService>(ExhibitionsService);
  });

  describe('createExhibition', () => {
    it('should create an exhibition', () => {
      // Arrange
      exhibitionsService.exhibitions = [];
      const payload = {
        id: 1,
        name: 'Exposition 1',
      }

      // Act
      const exhibition = exhibitionsService.createExhibition(payload);

      // Assert
      expect(exhibition).toBe(payload);
      expect(exhibitionsService.exhibitions).toHaveLength(1);
    });
  })
});
```

Décomposons les étapes :  
- Arrange : Nous réalisons un peu de mise en place avant le test en définissant le payload dans une variable
- Act : Nous appellons la méthode `createExhibition`
- Assert : Nous définissons le retour attendu

Comme exercice pratique, vous pouvez écire les tests des méthodes suivantes avant de passer à la prochaine étape.

## Tester avec des mocks

Dans l'exemple précédent, nous n'avons utilisé aucune dépendance (rien n'a été passé dans le constructeur), ce qui simplifit les tests mais n'est pas très réaliste. Nous allons maintenant ajouter des dépendances à nos services et controlleurs.  

Pour l'exemple, nous allons ajouter deux services comme dépendance à `ExhibitionsService` : `HttpService` et `ConfigService`.  
On commance par installer les modules en question avec la commande suivante :  
```bash
npm i @nestjs/axios --save
```

Afin d'utiliser le module HTTP dans notre service, nous devons le rendre disponible à l'injection de dépendence en l'important dans le module, `exhibitions.module.ts` :  

```ts
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExhibitionsService } from './exhibitions.service';

@Module({
  imports: [HttpModule],
  providers: [ExhibitionsService]
})
export class ExhibitionsModule {}
```

Nous pouvons maintenant utiliser le `HttpModule` dans le service en le passant au constructeur.  

Nous ajoutons égallement une méthode `getEventNameById` qui retourne une liste d'événements dans une ville.  

```ts
// exhibitions.service.ts

import { 
  Injectable,
  InternalServerErrorException,
 } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

type Exhibition = {
  id: number
  name: string
}

@Injectable()
export class ExhibitionsService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  // ...

  async getEventNameById(uuid: number) {
    const { data } = await this.httpService.axiosRef({
      url: `/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20&refine=uid%3A${uuid}`,
      method: 'GET',
    });

    if (!data || !data.results || !data.results[0].originagenda_title) {
      throw new InternalServerErrorException();
    }

    return data.results[0];
  }
}
```

Ajouter ces dépendances crée quelques difficultés pour nos tests unitaires. Leur périmètre est maintenant étendu au comportement de ces dépendances égallement. Celles-ci peuvent aussi être asynchrones (comme utiliser le service `HttpService` pour faire une requête HTTP), ce qui peut affecter la performance de nos tests unitaites. 

La solution est d'utiliser des "test doubles". Dans nos tests unitaire, nous pouvons remplacer des dépendences spécifiques par des "doublures" de façon à ce qu'à l'execution du test il utilise la doublure au lieu de la vrais dépendence.  

Voici tout d'abord quelques tests unitaires que nous allons ajouter à la médhode `getEventNameById()` :  
1. Un id valide retourne les détails de l'événement
2. Si la réponse de l'API n'est pas celle qui était attendue, alors on retourne une `InternalServerErrorException`

Avant d'aller plus loins, si vous jouez vos tests exhistants, vous deviez voir une erreur du type `Nest can't resolve dependencies of the ExhibitionsService ` :  
```bash
 FAIL  src/exhibitions/exhibitions.service.spec.ts
  ● ExhibitionsService › createExhibition › should create an exhibition

    Nest can't resolve dependencies of the ExhibitionsService (?). Please make sure that the argument HttpService at index [0] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If HttpService is a provider, is it part of the current RootTestModule?
    - If HttpService is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing HttpService */ ]
      })
```

Vous voyez cette erreur car Jest tente de jouer les tests mais il manque à l'instance de test une dépendance, le `HttpService`.  

Nous devons donc fournir cette dépendance au module de test de façon à ce que lorsque les tests sont joués, la dépendance soit passée au module de test et puisse être utilisé au sein de `ExhibitionsService`.  

C'est là l'un des plus grand bénéfice de l'injection de dépendance. Vous pouvez facilement échanger les dépendances avec une alternative plus appropriée dans le contexte d'un test. Par exemple, nous pourriez passer le vrais service HttpService qui effectura une vrais requête HTTP ou nous pourrions passer un "test double" de `HttpService` qui prétendra le faire.  

A présent, nous allons commencer par implémenter les tests en utilisant la vrais dépendance, puis nous mettrons à jour pour mocker les requêtes HTTP.  

Pour corriger l'erreur de dépendance manquante dans `exhibitions.service.spec.ts`, nous devons juste ajouter `HttpModule` comme import au module de test :  

```ts
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionsService } from './exhibitions.service';

describe('ExhibitionsService', () => {
  let exhibitionsService: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExhibitionsService],
    }).compile();

    exhibitionsService = module.get<ExhibitionsService>(ExhibitionsService);
  });

  // ...
}
```

A présent vous ne devriez plus voir d'erreur dans votre terminal !

Ajoutons maintenant nos tests pour la méthode `getEventNameById()` :  
```ts
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitionsService } from './exhibitions.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('ExhibitionsService', () => {
  let exhibitionsService: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExhibitionsService],
    }).compile();

    exhibitionsService = module.get<ExhibitionsService>(ExhibitionsService);
  });

  // ..

  describe('getEventNameById', () => {
    it('valid event uuid to return event name', async () => {
      const eventName = exhibitionsService.getEventNameById(53488830);

      await expect(eventName).resolves.toBe('Nuit européenne des musées 2023 : Île-de-France');
    });

    it('invalid event uuid to throw error', async () => {
      const eventName = exhibitionsService.getEventNameById(42);

      await expect(eventName).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });
  
});
```

Dans ces tests, puisque `getEventNameById()` est une méthode asynchrone, nous utilisons les méthodes `resolves` et `rejects` de Jest pour les gérer.  

Nos tests devraient maintenant passer correctement.  

Puisque nous n'avons pas mocké la dépendance, la méthode `getEventNameById()` effectue de vrais appels HTTP, ce qui pose les problèmes suivants (qui s'appliquent égallement si on consommait une base de donnée à la place d'une API) :  
- Faire des appels réseau dans vos tests peuvent les rendre plus lents
- Vous n'avez pas la garantie que votre API vous retournera toujours le même résultat (vos tests sont donc dépendant d'une source de vérité tiers)
- Les tests devraient se concentrer sur le comportement de la méthode, peut importe les dépendances

A présent, voyons comment nous pouvons mocker notre service HTTP.  

### Mocker le service `HttpService`

Pour commencer, nous allons utiliser les fonctions de mock de Jest puis nous en expliquerons les limites et implémenterons une alternative plus puissante.  

