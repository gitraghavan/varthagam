# Varthagam

## Description

An Open source integration project that connects ICICI bank Breeze API to a customized frontend.

## Running Client
    - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4 and upgraded to angular latest (14.0.1).
    - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
    - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
    - Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
    - Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end to-end testing capabilities.
    - To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Running Server
    - This project was generated using Node JS
	- The Server requires environment variables. Please create a dev.env file under ./server/configs/ and create the following variables
		DOMAIN=###########
		PORT=####
		APP_NAME=#########
		API_KEY=####################################
		API_SECRET=####################################
		AURL=####################################
		
	DOMAIN - Refers to the domain at which the server is running
	PORT - Refers to the port that the server should use
	APP_NAME - Your custom name to the application
	API_KEY & API_SECRET - Can be obtained from ICICI Direct Breeze API site (https://api.icicidirect.com/apiuser/home) after the user registers a new application. Requires a trading account in ICICI Direct.
	AURL - Authentican URL. This is created by the user at ICICI Direct Breeze API site. This refers to the auth server location where the request will be sent.

## Pre Requesites & Dependencies
    Node JS     - (latest stable version)
    Mongo DB    - (latest stable version)
    Socket.io   - (latest stable version)
