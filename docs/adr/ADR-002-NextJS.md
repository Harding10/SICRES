# ADR-002 : Choix du framework Frontend (Next.js)

## Contexte
L'interface utilisateur de SICRES nécessite une application web moderne, réactive et performante. Nous avons envisagé React pur (Vite), Angular, Vue.js et Next.js.

## Décision
Nous avons choisi **Next.js** avec **React**.

## Justification
- **SSR et SEO** : Next.js offre le Server-Side Rendering (SSR) qui améliore les performances de chargement initial et le référencement (SEO).
- **App Router** : La nouvelle architecture App Router de Next.js facilite grandement la création d'interfaces complexes (Layouts imbriqués, composants serveurs).
- **Écosystème React** : La communauté React est la plus grande, garantissant un large choix de bibliothèques compatibles (TailwindCSS, Radix UI, etc.).
- **Pourquoi pas Angular ?** La courbe d'apprentissage est plus raide, et le framework peut être très verbeux pour des besoins UI qui requièrent de la souplesse.

## Conséquences
- L'équipe doit maîtriser React, les Hooks, et les concepts spécifiques à Next.js (Server Components vs Client Components).
- L'architecture frontend doit être bien structurée pour éviter le chaos dû à la liberté offerte par React.
