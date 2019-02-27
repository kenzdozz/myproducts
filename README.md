# Myproducts
A nodejs app to manage products, with API endpoints to create, list all products and get a single product.

### Features
- Express - Server
- SQLite - Database

## Instructions to install
### Requirements
- Nodejs & NPM - Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. NPM is Node Package Manager.
- [Download here](https://nodejs.org/en/download/)

### Installing
To install run 
> `git clone https://github.com/kenzdozz/myproducts.git`

When this is done, run 
> - `cd myproducts`
> - `npm install`

To start the app run
> `npm start`

## Testing and Usage
### On Local
On your browser, a visit to `http://localhost:3033/` takes you to UI of the app. (You can change the port on app.js).

The API is hosted on `http://localhost:3033/api/v1`

### On Heroku
> - [Click here to visit My Products](https://productz.herokuapp.com/)

The API is hosted on `https://productz.herokuapp.com/api/v1`

A POST request to `/products` with form data `name, category, price, description, color, image` creates a new record and returns a JSON response object with properties `status` response status code and `data` the newly created record.

A PATCH request to `/products/:id` with form data: any or all of `name, category, price, description, color, image` updates the record with the `:id` and returns a JSON response object with properties `status` response status code and `data` the newly updated record.

A DELETE request to `/products/:id` will delete the record with `:id` and returns a JSON response object with properties `status` response status code and `message` a success message.

A GET request to `/products/:id` will get the record with `:id` and returns a JSON response object with properties `status` response status code and `data` of the specified item.

## Licence
MIT
