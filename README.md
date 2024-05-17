# Expense-tracker-mobile

Mini-projet réalisé dans le cadre du cours IONIC durant la formation CDA JAVA chez Diginamic avec Olivier Andrade.

Groupe : 2024-M03 (Alternance)

## Objectifs

Le but, a terme, est de créer une application mobile pour accompagner une application que j'ai déjà créé avec Angular.

Cette application est un tracker de dépense.

L'application est disponible à l'adresse suivante : https://lpreaux.github.io/expense-tracker/  
Et le code source : https://github.com/lpreaux/expense-tracker

Pour les 3 jours de mini-projet le but est d'intégrer des fonctionnalités de partager les dépenses dans un groupe type Tricount.

## Backlogs

Fonctionnalités que j'attends pour le mini-projet :

### 1ère étape :

- [x] 1 page d'accueil qui liste les groupes dans lesquels on participe.
- [x] 1 page de détail d'un groupe inspiré de l'application déjà réalisé :  
  ![Illustration des choses à modifier par rapport à l'application d'origine](/conception/Modif-depuis-app-existante.png)
- [x] 1 page qui permet de gérer la liste des participants à un groupe.
- [x] 1 historique de dépense par groupe.
- [x] Sauvegarde des dépenses dans indexedDb.
- [x] Sauvegarde des groupes dans indexedDb.
- [x] Sauvegarde des participants dans indexedDb.
- [x] 1 dépense peut être associé à un lieu qui peut être obtenu grâce à la géolocalisation.
- [x] Pouvoir ajouter une photo d'un ticket à une dépense.

#### Cas d'utilisation détaillé :

En tant qu'utilisateur :

- [x] CRUD Groupe :
  - [x] Lister les groupes
  - [x] Affiché les infos d'un groupe
  - [x] Ajout d'un groupe
  - [x] Modification d'un groupe
  - [x] Suppression d'un groupe
- [ ] CRUD Dépense :
  - [x] Lister les dépenses d'un groupe
  - [x] Affiché le détail d'une dépense
  - [x] Ajout d'une dépense dans un groupe
  - [ ] Modification d'une dépense
  - [x] Suppression d'une dépense
- [x] CRUD Participant :
  - [x] Lister les participants d'un groupe
  - [x] Ajout d'un participant dans un groupe
  - [x] Modification d'un participant
  - [x] Suppression d'un participant

#### Règles métiers :

- [x] Groupe:
  - [x] Un groupe a forcément un nom
- [x] Dépense:
  - [x] Une dépense a forcément un libellé
  - [x] Une dépense a forcément un montant
  - [x] Une personne a forcément un participant (la personne qui a payé)
- [x] Participant:
  - [x] Un participant a forcément un nom


### 2ème étape :

- [ ] 1 page d'équilibre avec :
  - [ ] un graphique montrant qui doit de l'argent et qui doit en recevoir.
  - [ ] une liste de des montants du par qui et à qui.
  - [ ] Pouvoir envoyer une demande de remboursement.
  - [ ] Pouvoir partager un récapitulatif avec les fonctions du tel.

### 3ème étape : 

- [ ] Plusieurs utilisateurs peuvent utiliser un même groupe.
- [ ] Chaque utilisateur peut être associé à un participant.
- [ ] Un utilisateur peut laisser des informations de remboursement.
- [ ] Possibilité de rembourser depuis l'app - avec Stripe (plugin capacitor) ?


> [!NOTE]
> Le but est d'avancé étape par étape et d'avoir au moins l'étape 1 en fin de projet.

---

## Maquette Figma

Une maquette figma avec un prototype fonctionnel est disponible à l'adresse suivante :

- [maquette](https://www.figma.com/design/0waB0iN1MJPkdvgaHlUBtY/Material-3-Design-Kit-(Community)?node-id=54801%3A25393&t=fl3Fv9LQSLOq4b8V-1)
- [prototype](https://www.figma.com/proto/0waB0iN1MJPkdvgaHlUBtY/Material-3-Design-Kit-(Community)?page-id=54801%3A25393&node-id=54826-28755&viewport=775%2C532%2C0.99&t=IGXkDFNYVJCh72ub-1&scaling=scale-down&starting-point-node-id=54826%3A28755)

(La maquette actuelle est une ébauche permettant d'avoir une idée de l'objectif mais n'est pas pixel perfect et pourra évoluer au cours du développement)

---
## Dépendances

- Ionic 7
- Angular 17
- Capacitor 6

plugin Capacitor :
- @capacitor/camera
- @capacitor/geolocation


---
## Usage

L'application fonctionne avec dans le navigateur (fonctionnalité native testé avec google chrome)

```
ionic serve
```

L'application fonctionne également sur smartphone ou avec un émulateur :

```
ionic cap run android
```

> [!NOTE]
> La récupération de la géolocalisation lors de l'enregistrement d'une dépense avec la "Position actuelle" comme lieu prend du temps (particulièrement sur mobile)
> et il n'y a pas encore d'indicateur ce qui peut faire pensé que l'application a planté. Mais ça fonctionne bien, il faut juste laissé quelque seconde à l'application.
