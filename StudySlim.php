Slim est un framework léger pour PHP, souvent utilisé pour créer des API RESTful
de manière simple et rapide, un peu comme Express pour Node.js. Voici une explication
des principales requêtes et commandes en utilisant Slim, avec une analogie basée sur ce que
vous connaissez déjà avec Node.js et Express.

1. Installation de Slim
En Node.js, on utilise npm install pour installer des packages. Avec Slim, on peut utiliser Composer (le gestionnaire de dépendances pour PHP) pour installer le framework.

bash
Copier le code
composer require slim/slim:"4.*"
C'est l'équivalent de npm install express en Node.js.

2. Structure de base d'une application Slim
En Express, vous définissez vos routes dans un fichier JavaScript. Dans Slim, cela ressemble un peu à cela, mais en PHP.

Exemple Slim :
php
Copier le code
<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

// Route GET simple
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write("Hello, Slim!");
    return $response;
});

// Démarrer l'application
$app->run();
Dans Express, vous auriez quelque chose comme ça :

js
Copier le code
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000);
3. Les Routes HTTP
GET : Récupérer des informations
Slim :
php
Copier le code
$app->get('/api/user/{id}', function ($request, $response, $args) {
    $userId = $args['id']; // Extraction des paramètres
    // Recherche de l'utilisateur dans la base de données, par exemple
    $response->getBody()->write("User ID: $userId");
    return $response;
});
Express :
js
Copier le code
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  // Recherche de l'utilisateur dans la base de données
  res.send(`User ID: ${userId}`);
});
POST : Créer des ressources
Slim :
php
Copier le code
$app->post('/api/user', function ($request, $response, $args) {
    $data = $request->getParsedBody(); // Récupère les données envoyées en POST
    $name = $data['name'];
    // Créer un utilisateur avec le nom
    $response->getBody()->write("User $name created!");
    return $response;
});
Express :
js
Copier le code
app.post('/api/user', (req, res) => {
  const name = req.body.name;
  // Créer un utilisateur avec le nom
  res.send(`User ${name} created!`);
});
PUT : Mettre à jour des ressources
Slim :
php
Copier le code
$app->put('/api/user/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    $data = $request->getParsedBody();
    // Mettre à jour l'utilisateur avec $id
    $response->getBody()->write("User $id updated!");
    return $response;
});
Express :
js
Copier le code
app.put('/api/user/:id', (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  // Mettre à jour l'utilisateur avec id
  res.send(`User ${id} updated!`);
});
DELETE : Supprimer des ressources
Slim :
php
Copier le code
$app->delete('/api/user/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    // Supprimer l'utilisateur avec $id
    $response->getBody()->write("User $id deleted!");
    return $response;
});
Express :
js
Copier le code
app.delete('/api/user/:id', (req, res) => {
  const id = req.params.id;
  // Supprimer l'utilisateur avec id
  res.send(`User ${id} deleted!`);
});
4. Manipulation des Réponses
Slim : Pour ajouter des headers, modifier le code de statut HTTP, ou envoyer une réponse JSON, voici un exemple :
php
Copier le code
$app->get('/api/user', function ($request, $response, $args) {
    $data = ['name' => 'John', 'age' => 30];
    return $response->withJson($data, 200);
});
Cela ressemble à :

Express :
js
Copier le code
app.get('/api/user', (req, res) => {
  const data = { name: 'John', age: 30 };
  res.status(200).json(data);
});
5. Middleware (similaire à Express)
En Slim, les middlewares sont utilisés pour effectuer des actions avant ou après que la requête ne soit traitée. Voici un exemple où nous ajoutons un middleware pour vérifier l'authentification :

php
Copier le code
$app->add(function ($request, $response, $next) {
    // Vérifier si l'utilisateur est authentifié
    $response = $next($request, $response);
    return $response;
});
En Express, cela ressemble à ceci :

js
Copier le code
app.use((req, res, next) => {
  // Vérifier l'authentification
  next();
});
Conclusion
En résumé, travailler avec Slim ressemble beaucoup à travailler avec Express, sauf qu’il est basé sur PHP. Vous allez définir des routes, gérer des requêtes HTTP, travailler avec des données d'entrées et de sortie, et ajouter des middlewares. Les deux frameworks sont très similaires dans leur structure, vous devriez donc vous sentir à l'aise rapidement avec Slim si vous êtes déjà habitué à Express.

// EXERCICES PRATIQUES 

Voici un exemple de code en utilisant le framework **Slim** pour créer une route `/Inscription` qui reçoit des données, crée un utilisateur, génère un jeton d'authentification (token) et enregistre l'utilisateur dans une base de données MySQL. Cet exemple suppose que vous avez configuré une connexion à la base de données dans un fichier séparé.

### Structure du projet
```
- src/
  - config/
    - database.php
  - routes/
    - auth.php
- public/
  - index.php
```

### Fichier de configuration `src/config/database.php`
```php
<?php

use PDO;

return function() {
    $host = '127.0.0.1';
    $db = 'nom_de_votre_bd';
    $user = 'votre_utilisateur';
    $pass = 'votre_mot_de_passe';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    return new PDO($dsn, $user, $pass, $options);
};
```

### Route `/Inscription` dans `src/routes/auth.php`
```php
<?php

use Slim\Routing\RouteCollectorProxy;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Firebase\JWT\JWT;

return function ($app) {
    $app->post('/Inscription', function (Request $request, Response $response) {
        // Charger la configuration de la base de données
        $dbConfig = require __DIR__ . '/../config/database.php';
        $pdo = $dbConfig();

        // Récupérer les données envoyées par le client
        $data = $request->getParsedBody();
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            $response->getBody()->write(json_encode(['error' => 'Email et mot de passe requis']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Vérifier si l'utilisateur existe déjà
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $response->getBody()->write(json_encode(['error' => 'Utilisateur déjà existant']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Hacher le mot de passe
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Générer un token d'authentification
        $key = "votre_cle_secrete"; // Remplacez par une clé secrète robuste
        $payload = [
            'email' => $email,
            'iat' => time(),
            'exp' => time() + (10 * 365 * 24 * 60 * 60)  // expiration dans 10 ans
        ];
        $token = JWT::encode($payload, $key, 'HS256');

        // Insérer l'utilisateur dans la base de données
        $stmt = $pdo->prepare("INSERT INTO users (email, password, token) VALUES (?, ?, ?)");
        $stmt->execute([$email, $hashedPassword, $token]);

        // Réponse au client
        $response->getBody()->write(json_encode(['message' => 'Inscription réussie', 'token' => $token]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    });
};
```

### Point d'entrée `public/index.php`
```php
<?php

use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Charger les routes
$authRoutes = require __DIR__ . '/../src/routes/auth.php';
$authRoutes($app);

// Lancer l'application
$app->run();
```

### Table MySQL `users`
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Instructions
1. **Installer les dépendances** : 
   - Slim Framework : `composer require slim/slim`
   - Firebase JWT : `composer require firebase/php-jwt`
2. Configurez vos informations de base de données dans `src/config/database.php`.
3. Lancez le serveur avec : `php -S localhost:8000 -t public`.
4. Faites un test avec un outil comme Postman en envoyant une requête `POST` vers `http://localhost:8000/Inscription` avec un corps JSON contenant `email` et `password`.

N'hésitez pas à adapter selon vos besoins !

// DESIGN 
Voici un composant personnalisé pour l'écran de **chargement initial** de votre application **Tech-Eng**. Il utilise une animation avec la bibliothèque `react-native-lottie` pour un effet moderne et engageant.

---

### Étape 1 : Installer les dépendances

1. Installez `react-native-lottie` :
   ```bash
   npm install lottie-react-native
   ```
   Et ajoutez le package Lottie si vous êtes sur Expo :
   ```bash
   expo install lottie-react-native
   ```

2. Téléchargez une animation Lottie (format `.json`) depuis [LottieFiles](https://lottiefiles.com/). Par exemple, une animation "loader" ou "logo".

---

### Étape 2 : Composant d'écran de chargement

Voici un composant complet avec une animation Lottie et un texte personnalisé.

```jsx
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ onFinish }) => {
  // Simule une durée d'affichage du splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 3000); // Durée : 3 secondes
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* Logo de l'application */}
      <Image
        source={require("../assets/index/TechEngLogo.png")}
        style={styles.logo}
      />
      {/* Animation Lottie */}
      <LottieView
        source={require("../assets/animations/loader.json")} // Placez votre animation Lottie ici
        autoPlay
        loop
        style={styles.animation}
      />
      {/* Texte personnalisé */}
      <Text style={styles.text}>Bienvenue chez Tech-Eng</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023", // Couleur de fond de l'application
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
});

export default SplashScreen;
```

---

### Étape 3 : Intégration dans votre application

1. Utilisez le composant `SplashScreen` dans votre `App.js` ou votre composant principal.
2. Gérez la navigation vers l'écran principal une fois le chargement terminé.

```jsx
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./components/SplashScreen";
import Index from "./Index"; // Votre composant principal

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <Index />
      )}
    </NavigationContainer>
  );
};

export default App;
```

---

### Étape 4 : Ajouter une animation cool
- **Logo animé** : Vous pouvez remplacer `loader.json` par une animation spécifique au thème de Tech-Eng, par exemple un engrenage tournant ou un graphique lié à l'ingénierie.
- **LottieFiles suggestions** :
  - "Loading Gear" : Une roue dentée en mouvement.
  - "Tech Glow" : Une animation lumineuse sur le logo.

---

### Fonctionnalités supplémentaires
1. **Transition fluide** : Ajoutez une animation d’opacité ou de translation lorsque le splash screen disparaît.
2. **Personnalisation du texte** : Chargez dynamiquement un message de bienvenue spécifique (par exemple, nom de l'utilisateur si disponible).

Avec ce composant, votre application Tech-Eng aura une **première impression élégante et professionnelle** ! 🎉