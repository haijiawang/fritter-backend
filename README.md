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

#### `PUT /api/freets/save/:freetId?/:collectionId?` - Save a Freet to a Collection

**Body**


**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the user is not logged in
- `404` if the freetId/colletionId is invalid

#### `PUT /api/freets/remove/:freetId?/:collectionId?` - Remove a Freet from a Collection

**Body**


**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the user is not logged in
- `404` if the freetId/colletionId is invalid

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
- `400` If the name is empty/invalid

#### `DELETE /api/collections/:collectionId?` - Delete an existing collection

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `404` if the collection does not exist

#### `PUT /api/freets/collections/:collectionId?` - Update an existing collection name

**Body**

- `name` _{string}_ - The new name you want to change to. 

**Returns**

- A success message
- An object with the updated collection

**Throws**

- `403` if the user is not logged in
- `404` if the collection does not exist
- `400` if the new collection name is empty or invalid

#### `GET /api/collections/all` - Get all the collections in database

**Returns**

- An array of all collections

#### `GET /api/collections/userId` - Get freets by author

**Body**


**Returns**

- An array of freets saved by author with userID. 

**Throws**

- `403` if the user is not logged in
- `404` if the userID does not exist

____________________________________________________________________________________

#### `GET /api/feed/user/:userId?/following` - Get the following feed (feed consisting of posts the user follows) 

**Returns**
- A success message
- A list of Freet ID's belonging the the "following" freets. 

**Throws**

- `403` if the user is not logged in

#### `GET /api/feed/user/:userId?/recommended` - Get the recommended feed (feed consisting of posts that are recommended) 

**Returns**
- A success message
- A list of Freet ID's belonging in the "recommended" freets. 

**Throws**

- `403` if the user is not logged in

#### `GET /api/feed/community/:communityId?` - Get the community feed (feed consisting of posts that belong in a community) 

**Returns**
- A success message
- A list of Freet ID's belonging in the community's forum freets. 

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist

#### `GET /api/feed/:userId?` -  Gets the followers of userID

**Returns**
- A success message
- A list of ID's belonging to the followers of the user.  

**Throws**

- `403` if the user is not logged in
- `404` if the user does not exist

#### `PUT /api/feed/follow/:userId?` -  The userID in session follows the userID in the params. 

**Returns**

- A success message
- The user object 

**Throws**

- `403` if the user is not logged in
- `404` if the user does not exist

#### `PUT /api/feed/unfollow/:userId?` -  The userID in session unfollows the userID in the params. 

**Returns**

- A success message
- The user object 

**Throws**

- `403` if the user is not logged in
- `404` if the user does not exist

____________________________________________________________________________________

#### `POST /api/community` - Create a new community with owner

**Body**

- `name` _{string}_ - The name of the community
- `owner` _{string}_ - The owner of the community. 

**Returns**

- A success message
- An object with the new community

**Throws**

- `403` if the user is not logged in
- `400` If the name is empty

#### `DELETE /api/community/:communityId?'` - Delete a community


**Returns**

- A success message
- An object with the new community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `401` if the user is not authorized as an owner

#### `PUT /api/community/:communityId?'` - Update a community name


**Returns**

- A success message
- An object with the new community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `400` if the community name is invalid
- `401` if the user is not authorized as an owner


#### `PUT /api/community/public/:communityId` - update community to be public

**Body**

**Returns**

- A success message
- An object with the updated community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `401` if the user is not authorized as an owner

#### `PUT /api/community/private/:communityId` - update community to be private

**Body**

**Returns**

- A success message
- An object with the updated community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `401` if the user is not authorized as an owner

#### `PUT /api/community/:communityId?/member/:userId?` - Add a member to the community

**Body**

**Returns**

- A success message
- An object with the updated community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `403` if the user already exists in community


#### `PUT /api/community/:communityId?/freet/:freetId?` - save a freet to the community

**Body**

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `404` if the community/freet does not exist

#### `DELETE /api/community/:communityId?/member/:userId??` - Delete an existing member from community

**Returns**

- A success message
- A object with the new community

**Throws**

- `403` if the user is not logged in
- `404` if the community/freet does not exist

#### `PUT /api/community/:communityId?/owner/:userId?` - Add a owner to the community

**Body**

**Returns**

- A success message
- An object with the updated community

**Throws**

- `403` if the user is not logged in
- `404` if the community does not exist
- `403` if the user already exists in community

#### `DELETE /api/community/:communityId?/owner/:userId??` - Delete an existing owner from community

**Returns**

- A success message
- A object with the new community

**Throws**

- `403` if the user is not logged in
- `404` if the community/freet does not exist

#### `GET /api/community` - Get all communities

**Returns**
- A success message
- A list of all communities

**Throws**

- `403` if the user is not logged in
