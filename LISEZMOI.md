# Site Névé — comment le modifier

Le site est fait de pages HTML simples, sans outil ni compilation. On modifie un fichier, on l'enregistre, c'est en ligne au prochain déploiement.

| Rubrique | Fichier |
|---|---|
| Qui sommes-nous (accueil) | `index.html` |
| Propreté | `proprete.html` |
| Gestion des déchets | `gestion-des-dechets.html` |
| Écolabel | `ecolabel.html` |
| FAQ | `faq.html` |
| Contactez-nous | `contact.html` |
| Mentions légales et confidentialité | `mentions-legales.html` |

- **Textes** : ouvrir le fichier de la rubrique, chercher la phrase et la remplacer. Chaque bloc est annoncé par un commentaire `<!-- ===== NOM DU BLOC ===== -->`.
- **Photos** : déposer l'image dans `images/` et changer le chemin `src="images/..."` (ou `background-image` pour le bandeau du haut).
- **FAQ** : copier un bloc `<details>…</details>` dans `faq.html` et changer la question et la réponse.
- **Menu et pied de page** : ils sont recopiés dans chaque page. Pour ajouter ou renommer une rubrique, faire la même modification dans tous les fichiers `.html`.
- **Couleurs et polices** : en haut de `assets/neve.css`, dans `:root`.
- **Formulaire de contact** : envoyé par EmailJS, identifiants dans `assets/neve.js`.

Hébergement : Vercel pour l'instant (`vercel.json`), Hostinger ensuite (`.htaccess`). Déposer tout le contenu du dossier dans `public_html`.
