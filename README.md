# JensenWeather

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

This is a weather application built for the coding test at Jensen Education. The app retrieves current temperature data for a selected city using the Open-Meteo API and displays it to the user. The app is built entirely with Angular and styled with Tailwind CSS and Bootstrap.

You can also download the weather information as a CSV file.

I chose to build the application in Angular because it allowed me to use native TypeScript tools and a reactive approach. Initially, I considered saving previous searches with callbacks and possibly adding a backend, but this turned out to be manageable directly in the Angular frontend.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```


Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Future Improvements
Creating a .NET backend for persistence and user management.

Displaying weather icons based on conditions.

Making the UI responsive for mobile use.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
