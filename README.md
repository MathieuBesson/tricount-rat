# TricountRat

Cette appplication est basé sur les fonctionnalités simplifiés de [Tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis).

## Pré-requis

Le projet utilise docker comme environnement de travail.
Il vous faudra donc au préalable avoir [docker](https://docs.docker.com/engine/install/) et [docker-compose](https://docs.docker.com/compose/install/) installés sur sur votre machine pour pouvoir lancer le projet

## Configuration

### Définition des variables d'environnement.

De manière à utiliser vos propres variables d'envionnement il est nécéssaire de redéfinir les variables présentent dans le fichier `.env.example` dans un nouveau fichier `.env` avec les valeurs de votere choix.

## Installation

La commande suivante va lancer les conteneurs `node`, `postgres` et `pgadmin` nécéssaires au projet.

```bash
docker-compose up --build -d
```

Vous pouvez maintenant accèder aux différents soft sur les ports suivants : 

- `api` : [http://localhost:3000](http://localhost:3000) 
- `postgres` : [http://localhost:3000](http://localhost:3000) 
- `pgadmin` : [http://localhost:5050](http://localhost:3000)

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

## Liens utiles

- Nest : 
  - [Documentation](https://docs.nestjs.com/)
  - [Repository Github](https://github.com/nestjs/nest)