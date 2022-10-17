## API routes

The following api routes have already been implemented for you (**Make sure to document all the routes that you have added.**):

#### `GET /`

This renders the `index.html` file that will be used to interact with the backend

#### `GET /api/freets` - Get all the freets

**Returns**

- An array of all freets sorted in descending order by date modified

#### `GET /api/freets?author=USERNAME` - Get freets by author

**Returns**

- An array of freets created by user with username `author`

**Throws**

- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user

#### `POST /api/freets` - Create a new freet

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created freet

**Throws**

- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long

#### `DELETE /api/freets/:freetId?` - Delete an existing freet

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the freetId is invalid

#### `PUT /api/freets/:freetId?` - Update an existing freet

**Body**

- `content` _{string}_ - The new content of the freet

**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the user is not logged in
- `404` if the freetId is invalid
- `403` if the user is not the author of the freet
- `400` if the new freet content is empty or a stream of empty spaces
- `413` if the new freet content is more than 140 characters long

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `403` if user is not logged in

#### `POST /api/users` - Create an new user account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use

#### `PUT /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

#### `DELETE /api/users` - Delete user

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in

____________________________________________________________________________________

#### `POST /api/collections` - Create a new collection

**Body**

- `name` _{string}_ - The name of the collection

**Returns**

- A success message
- A object with the new collection

**Throws**

- `403` if the user is not logged in
- `400` If the name is empty or already exists

#### `DELETE /api/collections` - Delete an existing collection

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `404` if the collection does not exist

#### `PUT /api/freets/collections` - Update an existing collection name

**Body**

- `name` _{string}_ - The name of the collection that you want to update. 
- `newName` _{string}_ - The name that you want to change the collection to. 

**Returns**

- A success message
- An object with the updated collection

**Throws**

- `403` if the user is not logged in
- `404` if the collection does not exist
- `400` if the new collection name is empty or invalid

#### `GET /api/collections` - Get all the collections owned by user

**Returns**

- An array of all collections

#### `GET /api/freets?author=USERNAME` - Get freets by author

**Body**

- `name` _{string}_ - The name of the collection whose contents you want to fetch.

**Returns**

- An array of freets saved under that collection name. 

**Throws**

- `403` if the user is not logged in
- `404` if the collection does not exist

____________________________________________________________________________________

#### `GET /api/feed` - Get both the following and recommended feed. 

**Returns**

- An object, mapping 'following' to an array of freets and mapping 'recommended' to array of freets. 

____________________________________________________________________________________

#### `POST /api/community` - Create a new community with owner

**Body**

- `name` _{string}_ - The name of the community
- `owner` _{string}_ - The owner of the community. 

**Returns**

- A success message
- A object with the new community

**Throws**

- `403` if the user is not logged in
- `400` If the name is empty or already exists

#### `DELETE /api/community` - Delete an community

**Body**

- `name` _{string}_ - The name of the community

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist

#### `PUT /api/community/join` - Update a community to have a new member

**Body**

- `id` _{user id}_ - The id of the user that wants to join. 
- `name` _{string}_ - The name of the community. 
- `role` _{string}_ - The role of the user, either an owner or member. 

**Returns**

- A success message
- An object with the updated community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist

#### `PUT /api/community/post` - Push a new freet to the community

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created freet

**Throws**

- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long

#### `DELETE /api/community/:freetId?` - Delete an existing freet from community

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the freetId is invalid
