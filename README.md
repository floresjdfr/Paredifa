# Paredifa
Paredifa is a regular expressions compiler with the following features:

 * Is able to create an automaton digraph from a regular expression itself.
 * You can create an automaton from scratch using the design tool,  you're able to set the vocabulary that the automaton will accept, create states (start and final) and transitions.
 * You can test if a string matches the automaton created by you or by compiling the regular expression.
 * You can run an animation on the automaton digraph showing the path of the string.
 * Persist your automatons to a Mongo DataBase


## Technologies used

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Auth0](https://auth0.com/)
* [MongoDB](https://www.mongodb.com/)
* [Prolog](https://www.swi-prolog.org/)

## Servers

This project was developed using 2 servers and one static page:

* The static page was created with React with Hooks
* There's a Prolog Server which is in charge of taking a regular expression, compiling it and returning an automaton JSON
* There's a middle ExpressJS Server which comunicates between the static website and the Prolog Server, also is able to persist the automatons created with your username to a MongoDB database running in Atlas MongoDB

## Environment Variables
### /client/.env :
* REACT_APP_AUTH0_DOMAIN
* REACT_APP_AUTH0_CLIENT_ID

The above environment variables are required to let [Auth0](https://auth0.com/) authentication work. You can visit their website to get more information.

### /server/.env : 
* MONGODB_URI: Allows automatons to be persistent using MongoDB
* PORT: Port where the server is listening. Default port is 5000

# Demo
<img src="https://github.com/floresjdfr/Paredifa/blob/main/Paredifa%20demo.gif" width="800" height="500" />


# Installation and execution

## Prolog Server

* In order to run the prolog server, you need to have [Prolog](https://www.swi-prolog.org/) installed in your device.
* Get to the server's root folder "/prolog_server/" and execute the following command:

`swipl server.pl`

## Express Server

* You need [NodeJS](https://nodejs.org/en/) installed on your machine
* You need to have MongoDB installed too or have a cloud account in [Atlas](https://www.mongodb.com/docs/atlas/?_ga=2.194023912.4718275.1659396922-1719441783.1658829494&_gac=1.254660858.1659401764.Cj0KCQjw852XBhC6ARIsAJsFPN1nXwfKuV97cvxpZrhCd3tJ5lxWDOWbe3jI1QcKIWt6qX_WEObuDkMaAoq7EALw_wcB)
* Get into the server's root folder "/server/"
* Set up the environment variables
* Run the command:

`npm start`

## React Development Server

* In order to run the React website in a development server get into the root folder "/client/"
* Set up the environment variables
* Run the command:

`npm start`