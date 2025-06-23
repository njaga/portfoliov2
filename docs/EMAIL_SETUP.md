# Configuration SMTP pour le formulaire de contact

## Nouvelle approche - API Next.js avec Nodemailer (Recommandée)

Cette nouvelle implémentation utilise une API route Next.js côté serveur avec Nodemailer au lieu d'EmailJS côté client, ce qui est plus fiable et sécurisé.

### 1. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
SMTP_FROM=contact@ndiagandiaye.com
```

### 2. Configuration Gmail (Recommandée)

#### Étape 1 : Activer l'authentification à 2 facteurs

1. Allez dans votre compte Google
2. Sécurité → Authentification à 2 facteurs
3. Activez l'authentification à 2 facteurs

#### Étape 2 : Générer un mot de passe d'application

1. Allez dans Sécurité → Mots de passe des applications
2. Sélectionnez "Mail" et votre appareil
3. Générez le mot de passe (16 caractères)
4. Utilisez ce mot de passe dans `SMTP_PASS`

### 3. Configuration alternative avec d'autres fournisseurs

#### Outlook/Hotmail

```env
SMTP_HOST=smtp.live.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
```

#### Yahoo

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=votre-email@yahoo.com
SMTP_PASS=votre-mot-de-passe-application
```

### 4. Test de la configuration

1. Redémarrez votre serveur de développement
2. Testez le formulaire de contact
3. Vérifiez les logs dans la console pour débogage

### 5. Avantages de cette approche

- ✅ Plus sécurisé (côté serveur)
- ✅ Pas de problèmes de CORS
- ✅ Pas de timeout client
- ✅ Meilleur contrôle des erreurs
- ✅ Emails de confirmation automatiques
- ✅ Templates HTML personnalisés
- ✅ **Emails bilingues français/anglais**
- ✅ Interface utilisateur en anglais pour usage international

### 6. Dépannage

#### Erreur "Invalid login"

- Vérifiez que l'authentification à 2 facteurs est activée
- Utilisez un mot de passe d'application, pas votre mot de passe principal
- Vérifiez que "Accès moins sécurisé" est désactivé

#### Erreur de connexion

- Vérifiez les paramètres SMTP_HOST et SMTP_PORT
- Assurez-vous que votre pare-feu n'bloque pas le port 587

#### L'email n'arrive pas

- Vérifiez les dossiers spam/courrier indésirable
- Vérifiez que SMTP_FROM est un email valide
- Consultez les logs du serveur pour plus de détails

---

## Ancienne configuration EmailJS (Dépréciée)

<details>
<summary>Cliquez pour voir l'ancienne configuration EmailJS</summary>

### Variables d'environnement (Ancien système)

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=r-xsl3lV8GxOC7HEP
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_vc3ag3p
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_gj0vzz7
```

**Note :** Cette configuration est maintenant dépréciée en faveur de l'API Next.js plus robuste.

</details>
