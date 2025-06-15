# Configuration EmailJS pour le formulaire de contact

## Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [EmailJS](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Connectez votre service email (Gmail, Outlook, etc.)

### 2. Créer les templates d'email

#### Template principal (pour recevoir les messages)

- **Template ID**: `template_contact_main`
- **Contenu**:

```html
Nouveau message de contact depuis votre site web De: {{from_name}}
({{from_email}}) Sujet: {{subject}} Message: {{message}} --- Envoyé depuis
ndiagandiaye.com
```

#### Template de confirmation (pour l'utilisateur)

- **Template ID**: `template_contact_confirmation`
- **Contenu**:

```html
Bonjour {{to_name}}, Merci pour votre message concernant "{{subject}}". J'ai
bien reçu votre demande et je vous répondrai dans les 24 heures. Votre message:
{{original_message}} Cordialement, Ndiaga Ndiaye contact@ndiagandiaye.com ---
Ceci est un message automatique de confirmation.
```

### 3. Variables d'environnement

Ajoutez ces variables dans votre fichier `.env.local`:

```env
# Variables publiques (préfixe NEXT_PUBLIC_ requis pour le côté client)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_contact_main
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_contact_confirmation
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important** : Les variables doivent avoir le préfixe `NEXT_PUBLIC_` car EmailJS fonctionne côté client.

### 4. Configuration du service

1. Dans EmailJS, allez dans "Email Services"
2. Ajoutez votre service email (Gmail recommandé)
3. Notez le Service ID

### 5. Test

1. Redémarrez votre serveur de développement
2. Testez le formulaire de contact
3. Vérifiez que vous recevez l'email et que l'utilisateur reçoit la confirmation

## Fonctionnalités

- ✅ Envoi d'email à contact@ndiagandiaye.com
- ✅ Email de confirmation automatique à l'utilisateur
- ✅ Validation des données côté serveur
- ✅ Gestion des erreurs
- ✅ Interface utilisateur avec états de chargement
- ✅ Notifications toast pour le feedback utilisateur

## Sécurité

- Les clés API sont stockées côté serveur uniquement
- Validation des données d'entrée
- Protection contre le spam (peut être étendue avec reCAPTCHA)
