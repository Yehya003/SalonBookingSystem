# Salon Booking System

## Disclaimer

This project is developed as a part of the study curriculam in the web development course at HKR.
The project is developed based on the MEAN stack.The development of this project is not meant for any commercial usage, it was mainly developed as a part of our learning objective.

## Introduction

<br>The MEAN stack consists of 4 pillars as follows
<b>Mango DB - Express - Angular - NodeJS</b> <br>
Mongo DB is a NoSQL database, Express is a framework that will be used with NodeJS, Angular is a front-end framework and NodeJS is a development tool in the back-end along with JavaScript programming language. <br>

### Stack Motivation

This stack is a good start point to scale up the application in the future. The NoSQL database have different advantages over an SQL DB such as it could be utilized in big data and it has higher query speed than an SQL relational database query since there will be no need to go through tables to reach the required information. Express provides good handling of HTTP requests, error handling and routing without the need to configure everything manually. NodeJS is exemplary to use with data intensive real time applications since it has a non-blocking I/O. Angular uses type script which is object oriented and is similar to Java object-oriented programming.

## Back-end specifications & Features

The back-end was developed with NodeJS, Express and Mangoose. The back-end offers secure req, res messaging between client-side and server-side as the development of the back-end utilized the use of server-side validation and request authentication using JWT.

### Back-end dvelopment runtime environment & tools

- NodeJS
- Express
- Mongoose
- Nodemon
- Json web token
- Bcryptjs
- Joi
- Dotenv
- Cors

### Express

Is a NodeJs web application framework that provides good handling of HTTP requests, error handling and routing without the need of manual configurations.

### Mongoose

Mongoose is an Object Data Modeling (ODM) library for Node.js that is hosted online on a remote cluster. It allows to have the database remotly and it manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects.

### Nodemon

Is used for dynamic reloading of the application(web page) after changing any JS code in the back end. it is efficient as it monitors the code changes and directly re-run the code without the need to run the file over and over manualy.

### Json web Token (JWT)

This is used to authenticate the server requests that based on a pre-condition of login. Scinario, if the user want to make abooking the user needs to be logged in first and then make the booking. The JWT allows to authenticate the requests by using tokens that is sent to the user upon login and then passed to the server along with each request. Furthermore, the server authenticates the token if it is valid the request will be proceed and the resources will be sent to the client-side; if not then a bad request with code 400 will be sent from the server side to client side.

### Bcryptjs

This library was used to encrypt and decrypt the user password. It is a very efficient library that allows to specify which encryption method that should be used along with specifing a secret key that will be used with the encryption algorithm. After the user registration when the user login his password will be validated using this tool.

### Joi

This tool is used to enforce the validation process by adding a server-side validation that checks wheather the request message includs the expected data format required. This tool checks e.x., if the email sent by the user is in the e-mail format and contains @ and . also checks multiple other things.

### Dotenv

This allows us to specify a .env file that can contain the values we want for the DB connection or port. The advantage of the .env file is that it is excluded when uploading to github so that others will not have the information about our DB credentials and even it allows dynamic changing of the port number, hence no need to hard code it.

### Cors

Is an HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources.

## Front-end specifications & Features

The front-end was developed and designed using Angular, along with Angular material UI components that Angular CLI provides. The theming used in this project was an Indigo pink. The front-end structured in a way to be simpler to understand, debug, tested as well as developing in the future. It was also developed to use HTTP Client to communicate with the server (Express.js) to be able to provide the user with the info/operations that needed from the server.
