# Configuration Multilingue (Français/Anglais)

Le site supporte maintenant deux langues : **Français** et **Anglais**.

## Structure

- **Fichiers de traduction** : `src/locales/fr.json` et `src/locales/en.json`
- **Hook de traduction** : `src/hooks/use-translation.ts`
- **Utilitaires i18n** : `src/lib/i18n.ts`
- **Middleware** : `src/middleware.ts` (gère les redirections selon la langue)
- **Sélecteur de langue** : `src/components/language-switcher.tsx`

## Utilisation

### Dans un composant client

```tsx
"use client";
import { useTranslation } from "@/hooks/use-translation";

export function MyComponent() {
  const { t, locale } = useTranslation();
  
  return (
    <div>
      <h1>{t.common.back}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

### Dans un composant serveur

Pour les composants serveur, vous devez passer la locale en paramètre :

```tsx
import { getTranslations } from "@/lib/i18n";

export default function ServerComponent({ params }: { params: { locale: string } }) {
  const t = getTranslations(params.locale as "en" | "fr");
  
  return <div>{t.common.back}</div>;
}
```

### Ajouter le sélecteur de langue

Ajoutez le composant `LanguageSwitcher` dans votre header/navigation :

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

// Dans votre header
<LanguageSwitcher />
```

## Routes

Le middleware redirige automatiquement vers la version localisée :
- `/` → `/en/` ou `/fr/` (selon la préférence du navigateur)
- `/projects` → `/en/projects` ou `/fr/projects`
- `/projects/kamit-website` → `/en/projects/kamit-website` ou `/fr/projects/kamit-website`

## Ajouter de nouvelles traductions

1. Ajoutez la clé dans `src/locales/en.json` :
```json
{
  "maSection": {
    "maCle": "My English text"
  }
}
```

2. Ajoutez la traduction française dans `src/locales/fr.json` :
```json
{
  "maSection": {
    "maCle": "Mon texte français"
  }
}
```

3. Utilisez dans votre composant :
```tsx
const { t } = useTranslation();
<p>{t.maSection.maCle}</p>
```

## Notes importantes

- La langue par défaut est l'anglais (`en`)
- Le middleware détecte automatiquement la langue préférée du navigateur
- Les routes doivent être mises à jour pour inclure le préfixe de locale
- Pour les liens internes, utilisez `addLocaleToPath()` de `@/lib/i18n`





