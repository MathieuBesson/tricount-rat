# TricountRat

Cette appplication est basée sur les fonctionnalités simplifiés de [Tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis).

## Pré-requis

Le projet utilise docker comme environnement de travail.
Il vous faudra donc au préalable avoir [docker](https://docs.docker.com/engine/install/) et [docker-compose](https://docs.docker.com/compose/install/) installés sur sur votre machine pour pouvoir lancer le projet

## Configuration

### Définition des variables d'environnement.

De manière à utiliser vos propres variables d'envionnement il est nécéssaire de redéfinir les variables présentent dans le fichier `.env.example` dans un nouveau fichier `.env` avec des valeurs au choix.

## Installation

La commande suivante va lancer les conteneurs `node`, `postgres` et `pgadmin` nécéssaires au projet à parti des images référencés dans le fichier `docker-compose.yml`.

```bash
docker-compose up --build -d
```

Création de la BDD : 

```bash
docker exec tricount-rat-app npx prisma migrate dev
```

Création des données fictives (seed), déjà effectué par la commande précédente : 

```bash
docker exec tricount-rat-app npx prisma db seed
```

Vous pouvez maintenant accèder aux différents softs sur les ports suivants : 

- `api documentation` : [http://localhost:3000/api](http://localhost:3000/api) API documentée avec Swagger
- `postgres` : [http://localhost:5432](http://localhost:5432) 
- `pgadmin` : [http://localhost:5050](http://localhost:5050)

Connexion sur les différents outils avec les identifiants de votre `.env`.

## Informations utiles

- Installer des dépendances directement depuis le conteneur : 

```bash
docker exec tricount-rat-app npm install {package-name}
```

- Lancer le projet en mode `prod` : 

```bash
docker exec tricount-rat-app npm run start:prod
```

## Justification des choix techniques et explication de l'architecture

Ce document détail l'architecture du projet et les différents mécanismes et outils mis en place. 

### Choix techniques

Pour la partie API de ce projet il nous à été imposé d'utiliser le langage node.js mais les éventuelles framework et dépendances ont été laissés libres.

Les choix techniques pour ce projet sont les suivants : 

- **Framework backend : Nest.js**
    - Framework nodejs modulaire, avec une architecture basé sur les modules avec une structuration simple et réutilisable permettant la maintenabilité, la scalabilité et la lisibilité du code.
    - Il utilise Typescript permettant une meilleure robustesse, une meilleur auto-complétion et une réduction accrue des erreurs et bugs potentiels
    - De plus Nest est basé sur le famework express.js qui est connu pour ses performances élevées. De plus la gestion de l'asyncrhone est aussi un point important qui permet de gérer efficacement les requêtes simultanées.

- **SGBDR : PostgreSQL**
    - PostgreSQL est réputé pour être l'un des SGBDR les plus performants, y compris avec des grandes quantités de données. Il utilise des techniques avancées d'optimisation des requêtes, telles que l'optimisation de requêtes, la mise en cache, l'indexation avancée, etc.
    - De plus Postgres est réputé pour sa fiabilité et sa robustesse. Il garantit l'intégrité des données en utilisant des contraintes, des règles et des transactions ACID (Atomicité, Cohérence, Isolation, Durabilité). Cela assure que les données stockées dans la base de données restent cohérentes et fiables.

- **ORM : Prisma**
    - Prisma simplifie considérablement l'interaction avec la base de données. Il offre une interface de programmation (API) intuitive qui permet d'écrire des requêtes de base de données de manière déclarative à l'aide d'une syntaxe simple et efficace.
    - L'utilisation d'un ORM facilite la mise en œuvre de bonnes pratiques en matière de sécurité des données. Il utilise des requêtes paramétrées pour éviter les vulnérabilités d'injection SQL et garantire la sécurité et l'intégrité des données. 

- **Conteneurisation : Docker**
    - Docker permet d'encapsuler l'application, ses dépendances et sa configuration dans un conteneur léger et autonome.
    - Docker assure une isolation complète de l'environnement d'exécution et garanti que l'API fonctionne de manière cohérente et similaire quel que soit l'hôte. Les portabilité des conteneurs garantie sont éxécution sur n'importe quel environnements, tels que des machines locales, des serveurs de développement ou des infrastructures cloud.


### Explication de l'architecture du projet

#### Configuration du projet

Les fichiers `Dockerfile` et `docker-compose.yml` permettent de référencer la configuration docker du projet pour garantir un environnement identique quel que soit l'hôte du projet.

Comme sur tout projet node.js on retrouve les fichiers `package.json` et `package-lock.json` qui permettent de référencer les différentes dépendances du projet et les versions fixés sur le projet.

Les fichiers `tsconfig.build.json` et `tsconfig.json` permettent la gestion de la configuration de typescript et de build du code TS en JS.

#### Source du projet

- Dossier `/prisma`

Le dossier `/prisma` à la racine du projet contient le schéma prisma (`schema.prisma`) représentatif des données en BDD, c'est à partir de ce schéma qu'est construit la base de données et que sont gérés les migrations.

- Dossier `/src`

Le dossier `/src` contient le code source de l'application organisé par ressource de l'API : `expenditure`, `expenditure-category` et `user`.

Le point d'entrée du code source de l'app est le fichier `main.ts`, le fichier `app.module.ts` permet de charger tous les modules nécéssaire à toute l'application

Le dossier `/helpers` contient tous les fonctions utilitaires pouvants être utiles dans toute l'application.
Le dossier `/prisma` permet lui de configurer l'accès de l'application à la BDD grâce à Prisma et de permettre l'utilisation du module dans toute l'application. 

Les dossiers `expenditure`, `expenditure-category` et `user` ont tous la même architecture avec les fichiers suivants : `xxx.controller.ts`, `xxx.module.ts` et `xxx.service.ts` et les dossiers `dto` et `entities`. 
    - Le fichier `module` permet de définir les différents modules du dossier
    - Le fichier `service` regroupe toutes les fonctions intéragissant avec Prisma et donc avec la BDD
    - Le fichier `controller` sert de passe plat entre le client et les différentes requêtes de ressources de l'API
    - Le dossier `dto` contenant des fichiers de DTO permettant de définir et valider la structure des objets reçus du client
    - Le dossier `entities` contient les objets nécéssaire au typage des sorties API de la ressource du dossier

## Liens utiles

Nest : 
    - [Documentation](https://docs.nestjs.com/)
    - [Github Repository](https://github.com/nestjs/nest)

Prisma :
    - [Documentation](https://www.prisma.io/docs)
    - [Github Repository](https://github.com/prisma/prisma)

Docker : 
    - [Documentation](https://docs.docker.com/) 
    - [Github Repository](https://github.com/docker)

PostgreSQL : 
    - [Documentation](https://www.postgresql.org/docs/current/)
    - [Github Repository](https://github.com/postgres/postgres)
