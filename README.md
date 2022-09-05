# TealGreenHolidays

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Project description

This web application shows  a breakdown of the number of people that have been to each holiday destination per year in a table.

## Implementation Notes

This project uses:
- [Angular Material](https://material.angular.io/) for its UI elements
- [D3-DSV](https://github.com/d3/d3-dsv) for parsing TSV

## Development

This section describes the choices that have been made in the development of this project and issues that were encountered.
Angular Material was used, since it seems to have good table functionality.

After seeing the cube-results.json and unsure on the best way to parse the data, I used d3-dsv to parse the content.
In hindsight, this maybe excessive and I could've implemented my own function to parse the data.
I created interfaces to match the response and then mapped the parsed values to this interface.
Material Table required the data in a specific format which was quite troublesome.
The header codes were used as IDs to reference the header descriptions.
I then noticed that the data returned was in a different format displayed on a screenshot on the task.
On my table the destinations were at the top and the years were on the left.
From this I decided to implement a transpose function, that flips the years and destinations axis.

Since I hadn't used Angular Material or its Material Table before, I encountered issues implementing filtering and sorting.
The "magic" sorting and filtering that comes out of the box with Material Table didn't work, because its only available for static data.
Since the data received is dynamic from cube-results.json, I created my own filtering and sorting functions.

After doing this I created a header and footer to add some personality.
I then split the header and footer into components.

## Installation

Clone this repo and run  `npm install`.

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
