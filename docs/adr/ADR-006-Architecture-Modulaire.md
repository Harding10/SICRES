# ADR-006 : Architecture Modulaire Backend

## Contexte
L'application va potentiellement grossir et englober de nombreuses fonctionnalités. La structure par défaut de Laravel (`app/Http/Controllers`, `app/Models`) montre rapidement ses limites dans les gros projets en rendant le code difficile à naviguer.

## Décision
Nous adoptons une **Architecture Modulaire** (ou Domain-Driven Design "Light").

## Justification
- **Cohésion** : Regrouper le code par fonctionnalité (ex: `Modules/Invoices`, `Modules/Users`) plutôt que par type technique (Controllers, Models).
- **Maintenabilité** : Il est beaucoup plus facile de trouver tout ce qui concerne la "Facturation" si tout est dans un seul dossier.
- **Indépendance** : À terme, cela facilite l'extraction d'un module vers un micro-service si le besoin s'en fait sentir.

## Conséquences
- La structure standard de Laravel est légèrement modifiée.
- L'équipe doit s'entendre sur ce qui constitue un "Module" (Domaine) par rapport à une simple fonctionnalité transverse.
- Utilisation de namespaces personnalisés (ex: `App\Modules\FeatureName\Controllers`).
