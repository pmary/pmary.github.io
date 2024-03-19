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

Vous pouvez égallement lancer l'application avec la commande :
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
  let service: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();

    service = module.get<ExhibitionsService>(ExhibitionsService);
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
  let service: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();
    
    service = module.get<ExhibitionsService>(ExhibitionsService);
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
  let service: ExhibitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitionsService],
    }).compile();

    service = module.get<ExhibitionsService>(ExhibitionsService);
  });

  describe('createExhibition', () => {
    it('should create an exhibition', () => {
      // Arrange
      service.exhibitions = [];
      const payload = {
        id: 1,
        name: 'Exposition 1',
      }

      // Act
      const exhibition = service.createExhibition(payload);

      // Assert
      expect(exhibition).toBe(payload);
      expect(service.exhibitions).toHaveLength(1);
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