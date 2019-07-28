Normally, a module consists of CRUD functionally. So, we will break this into four parts. Starting from simplest

Create data

Read: load all data

Update data

Delete data 

 

Step 1: Create container module.

$ yarn run generate
or

$ npm run generate
Select container

Select stateless function

Give appropriate name (admin artist manage page)

Step 2: Connect it to router. Now, we can start the app for rest of the process

$ npm start 
or

yarn start
Open app/routes/admin.js import new module/ codeable

Import artist module page from containers/ admin artist page/ loadable

Add another object to array below

“/admin/dashboard”

Routes=[{
              …}
              ....,
              { path:/ admin artist manage
                Component artist manage 
Integrate route link in sidebar

app/layout/admin/components( main list item.js)
Copy any link block and make changes accordingly 

<link to= “/admin/artistmanage”>

<list item button selected= {path name=...>

<list item……..>

</link>

 

Now, the route should be setup

 

Step 3: Now, we can start working on the generated file

 

Edit 

 

/app/containers/admin/artist-manage-page/index.js

Import page header and page content return <....>

<page header> artist manage </page head>

<page content> this is body < /page content>

 

Step 4: Now, we want to call a get request to list down all artist

For every async api call, we define three actions: request, success, failure in constant.js. We follow redux ducks pattern here

export constant LOAD_ALL_REQUEST  

                         LOAD_ALL_SUCCESS

                         LOAD_ALL_FAILURE

We then create corresponding action creators in action.js

eg: export constant load request

  =  payload =({ type:(from constant) payload})

Step 5: Then we do api call from saga.js, where we take type of action in action.js and make function according to type. The function in saga.js is generic function as

eg: function* load all (...){...}

and use yield for it 

And we export all the functions in the saga as

export default function* default saga (..) { yield take/ takelatest( type, function)}

while calling api, we call it as 

eg: for get method

api.get ( request, success function, failure function)

Step 6: Then we have to modify reducer.js for different types like success, failure, request. We import produce from inner action type from constant and modify as below:

switch (action) {

Case type :

(modification)

break;

}

Step 7: Then we take the value of modified value in index.js from reducer.js through selector.js. The selector.js structure is as below:

export constant make select all=(..)

Create selector (select domain, state=state all);

Then use import the selector function in index.js use the value of reduce in index.js.

 

