# Serveur central

### Installation

-   `npm install`
-   Créer un fichier `.env` à la racine du projet
-   Y ajouter le contenu suivant :

```
PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PWD=
SECRET=
```

Voici un moyen très simple de générer un secret sur 256 bytes :

```
console.log(
    require('crypto')
        .randomBytes(256)
        .toString('base64')
);
```

### Usage

Lancer en mode développement : `npm run start`
