Adinspiration
This project is written in Node.js with TypeScript. It is a simple app that enables users to create their accounts, manage their accounts, create their own collections (with CRUD functionality), and save or unsave their favorite collections.

﻿

POST
localhost:5000/auth/register
localhost:5000/auth/register
Create user account.

Required fields:

Email

First Name

Last Name

Company Type

User Message

Hire UGC or not

Subscription (set to Free by default)

﻿

Body
raw (json)
json
{
    "email": "mailman@mail.com",
    "password": "password",
    "firstName": "John",
    "lastName": "Doe",
    "hireUGC" : true
}
GET
localhost:5000/auth/get-user/:id
localhost:5000/auth/get-user/:id
Request user details to populate their profiles or manage state in the Front End App (React.js with TypeScript)

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
id
6567d5756b7e8890493fa71b
POST
localhost:5000/auth/login
localhost:5000/auth/login
Login route to ensure the user is authenticated. This endpoint generates a JWT Token and also returns the user ID for other API usage.

﻿

Authorization
Bearer Token
Token
<token>
Body
raw (json)
json
{
    "email": "mailman@mail.com",
    "password": "password"
}
PUT
localhost:5000/auth/update-user/:id
localhost:5000/auth/update-user/:id
Simple route to update the user data.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
id
6567d5756b7e8890493fa71b
Body
raw (json)
json
{
    "firstName": "Johnathon",
    "lastName": "Doe",
    "companyType": "Firm",
    "userMessage": "Just trying to learn more about the business.",
    "hireUGC": false,
    "subscription": "Free",
    "collections": []
}
GET
localhost:5000/auth/get-users
localhost:5000/auth/get-users
This is specifically only for admin to get all users registers.

Note: None of these APIs return the password field.
﻿

DELETE
localhost:5000/auth/delete-user/:id
localhost:5000/auth/delete-user/:id
Endpoint to delete an account. Requires login.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
id
6567d5756b7e8890493fa71b
PUT
localhost:5000/api/v1/:userId/collection/:id
localhost:5000/api/v1/:userId/collection/:id
Update a collection.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e25a1ad9c82358fb3a62b
id
656e26f6977c391f4e1e40bc
Body
raw (json)
json
{
    "name": "My Trip To NewYork",
    "description": "Let us take you nowhere. Stay home bro. Go away.",
    "videoURLs": [
        "abcd.com",
        "google.com",
        "facebook.com",
        "newestcollection.com"
    ]
}
GET
localhost:5000/api/v1/:userId/collection/
localhost:5000/api/v1/:userId/collection/
Get all collections by the logged on specific user.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e25a1ad9c82358fb3a62b
POST
localhost:5000/api/v1/:userId/collection
localhost:5000/api/v1/:userId/collection
Create a new collection.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e25a1ad9c82358fb3a62b
Body
raw (json)
json
{
    "name": "My Trip To London",
    "description": "Let us take you nowhere. Stay home bro.",
    "videoURLs": ["abcd.com", "google.com", "facebook.com"]
}
DELETE
localhost:5000/api/v1/:userId/collection/:id
localhost:5000/api/v1/:userId/collection/:id
Delete a collection.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e25a1ad9c82358fb3a62b
id
656e26f6977c391f4e1e40bc
GET
localhost:5000/api/v1/collections
localhost:5000/api/v1/collections
Get all collections. Requires no login or authentication. This Endpoint is only to populate the Front End.

﻿

GET
localhost:5000/api/v1/collections/:collectionId
localhost:5000/api/v1/collections/:collectionId
Get a detailed data object for a specific collection.

﻿

Path Variables
collectionId
656cef3c631cad0eeb4cb269
POST
localhost:5000/api/v1/:userId/saved
localhost:5000/api/v1/:userId/saved
Add a new collection to your saved collections.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e3d496b98e95b50cd2d40
Body
raw (json)
json
{
    "collectionId": "656cef3c631cad0eeb4cb269"
}
PUT
localhost:5000/api/v1/:userId/saved
localhost:5000/api/v1/:userId/saved
Remove a collection from saved collections.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e3d496b98e95b50cd2d40
Body
raw (json)
json
{
    "collectionId": "656e280f547ebc0cd4f00df3"
}
GET
localhost:5000/api/v1/:userId/saved
localhost:5000/api/v1/:userId/saved
This Endpoint returns all the saved collections of a user.

﻿

Authorization
Bearer Token
Token
<token>
Path Variables
userId
656e3d496b98e95b50cd2d40