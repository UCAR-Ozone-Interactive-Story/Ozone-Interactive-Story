# Ozone Interactive Story

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

Node v24.15.0

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Layout

Inside `src/app`, there are 3 folders which contain the majority of our code:
- `core`: for core modules, services, interfaces, etc. used throughout the app. Should contain no UI code in here.
- `features`: for page components, such as the home page, play page, and scene definitions. Should loosely correspond to the associated routes in `src/app/app.routes.ts`. Any one-time components such as the language dropdown can live within the hierarchy here.
- `shared`: for reusable components like text, buttons, etc. which are independent of the page they're on; also could include custom pipes directives, etc. if we need them

In `tsconfig.json`, there are paths which define `@core`, `@features`, and `@shared` which should be used when importing modules between the folders (e.g. don't `import ../../../../core/story.service.ts`, use `import @core/story.service.ts`)

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Unit Tests

Unit tests were written for each scene component, story service, story player, and other important components. If more scenes are created, a spec file should be written and placed within the scene's directory.

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use either of the following commands:

`ng test` or `npm test`

**Created by Logan Bird, Tyler Campbell, Matt Harper, Matthew Kind, Quinn Nicodemus, Linh Tran, and Charlie Wheeler in collaboration with UCAR Center for Science Education**