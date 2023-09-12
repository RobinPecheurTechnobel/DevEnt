# DevEnt

## Part of the project

### user management

- user creation
  - Pseudo (unique)
  - Email (unique)
  - Mot de passe (Bonus formulaire : Confirmer le mot de passe)
  - prenom (requis)
  - nom (requis)
  - date de naissance (optionnel)
- user connection
  - user token management

### Event management

- Event management

  - Everybody can see ongoing event
  - Everybody can click on an event to see its details
  - The event creator can cancel/edit/delete his event
  - A user must be connected to register to an event
  - A user must be connected to create a new event

- Event model
  - Nom
  - Description (optionnel)
  - Début de l'évent (Date et Heure)
  - Fin de l'event (Date et Heure) (Doit être supérieur à Date de début)
  - photo (pas à la création, possibilité d'en rajouter une en faisant un update)
  - limite de personne (optionnel)

## Angular Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Compodoc

### Command

npm run startDoc

Or one of these :

#### Build

compodoc -p tsconfig.doc.json

#### Serve

compodoc -s

#### Build and serve

compodoc -p tsconfig.doc.json -s

### include and exclude

in file tsconfig.doc.json
