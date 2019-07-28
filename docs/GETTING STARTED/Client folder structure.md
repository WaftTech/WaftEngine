Client side is a fork of popular react-boilerplate project on github. We add various components and modules to understand the project setup at client side, you can go through ReadMe.md file.

1. app

assets: it contains static assets like images, videos, stylesheets etc.
 

2. components: You add your reusable react components. Some design components are made for the example purpose like:

header: It is header component.

customButton: it is button component

customInput: It is input box component.

page: 

table: It is table components used across admin panels

media element: which integrates the media (images) API and display the images. It also contains some utility components.

routes: it contains admin routes and user routes which are which are higher order components which secure the routing of view according to their logged in authority.

slick slider: It integrates slider API.

static content div: It is wrapper components for static content API.

data input: it is simple datapicker especially useful to select old dates.

3. containers: it contains modules. The main container that bootstraps the modules in the app container. Every container module follows a standard folder structure. All are the root landing pages. App folder contains following files:

components: components used in app container only.

action.js: contains list of action creators.

constants.js: contains list of action types.

reducer.js: redux-reducer function which contains initial value for redux store.

saga.js: redux-saga middleware for async action calls.

selectors.js: memorizing utility for selecting data from redux store.

test.js: you can add test here.

index.js: bootstraps routing, integrates global style and notifier(notistack).

 

5. admin manage page: they are the standard CRUD implementations of respective APIs.

 

6. images: folder contains favicon, app icon and logo.

 

7. layouts: it contains the base layout setup for the application for user, admin and public. Routes are looped here wrapped by a switch tag.

 

8. utils: utils folder contains the utilities used in the project. Extensively we use API.js to call APIs.