# AdInspiration API Documentation

AdInspiration is a simple Node.js with TypeScript app that allows users to create accounts, manage their profiles, create collections, and save their favorite collections.

## Table of Contents

1. [Authentication](#authentication)
    - [1.1 Sign Up](#11-sign-up)
    - [1.2 Log In](#12-log-in)
2. [User Management](#user-management)
    - [2.1 Update User](#21-update-user)
    - [2.2 Get All Users (Admin)](#22-get-all-users-admin)
    - [2.3 Delete User](#23-delete-user)
3. [Collections](#collections)
    - [3.1 Update Collection](#31-update-collection)
    - [3.2 Get All Collections by User](#32-get-all-collections-by-user)
    - [3.3 Create Collection](#33-create-collection)
    - [3.4 Delete Collection](#34-delete-collection)
    - [3.5 Get All Collections](#35-get-all-collections)
    - [3.6 Get Collection by ID](#36-get-collection-by-id)
4. [Saved Collections](#saved-collections)
    - [4.1 Add Saved Collection](#41-add-saved-collection)
    - [4.2 Remove Saved Collection](#42-remove-saved-collection)
    - [4.3 Get Saved Collections](#43-get-saved-collections)

## Authentication

### 1.1 Sign Up

- **Endpoint:** `POST /auth/register`
- **Description:** Create a user account.
- **Required fields:**
  - `email` (string)
  - `password` (string)
  - `firstName` (string)
  - `lastName` (string)
  - `hireUGC` (boolean, default: false)

```json
{
    "email": "mailman@mail.com",
    "password": "password",
    "firstName": "John",
    "lastName": "Doe",
    "hireUGC": true
}
```

### 1.2 Log In

- **Endpoint:** `POST /auth/login`
- **Description:** Log in with existing credentials.
- **Parameters:**
  - `email` (string)
  - `password` (string)

```json
{
    "email": "mailman@mail.com",
    "password": "password"
}
```

## User Management

### 2.1 Update User

- **Endpoint:** `PUT /auth/update-user/:id`
- **Description:** Update user data.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `id` (user ID)
- **Body:**

```json
{
    "firstName": "Johnathon",
    "lastName": "Doe",
    "companyType": "Firm",
    "userMessage": "Just trying to learn more about the business.",
    "hireUGC": false,
    "subscription": "Free",
    "collections": []
}
```

### 2.2 Get All Users (Admin)

- **Endpoint:** `GET /auth/get-users`
- **Description:** Get all registered users.
- **Authorization:** Bearer Token

### 2.3 Delete User

- **Endpoint:** `DELETE /auth/delete-user/:id`
- **Description:** Delete an account.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `id` (user ID)

## Collections

### 3.1 Update Collection

- **Endpoint:** `PUT /api/v1/:userId/collection/:id`
- **Description:** Update a collection.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)
  - `id` (collection ID)
- **Body:**

```json
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
```

### 3.2 Get All Collections by User

- **Endpoint:** `GET /api/v1/:userId/collection/`
- **Description:** Get all collections by a specific user.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)

### 3.3 Create Collection

- **Endpoint:** `POST /api/v1/:userId/collection`
- **Description:** Create a new collection.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)
- **Body:**

```json
{
    "name": "My Trip To London",
    "description": "Let us take you nowhere. Stay home bro.",
    "videoURLs": ["abcd.com", "google.com", "facebook.com"]
}
```

### 3.4 Delete Collection

- **Endpoint:** `DELETE /api/v1/:userId/collection/:id`
- **Description:** Delete a collection.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)
  - `id` (collection ID)

### 3.5 Get All Collections

- **Endpoint:** `GET /api/v1/collections`
- **Description:** Get all collections.
- **Note:** Requires no login or authentication. Only for Front End.

### 3.6 Get Collection by ID

- **Endpoint:** `GET /api/v1/collections/:collectionId`
- **Description:** Get detailed data for a specific collection.
- **Path Variables:**
  - `collectionId` (collection ID)

## Saved Collections

### 4.1 Add Saved Collection

- **Endpoint:** `POST /api/v1/:userId/saved`
- **Description:** Add a new collection to saved collections.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)
- **Body:**

```json
{
    "collectionId": "656cef3c631cad0eeb4cb269"
}
```

### 4.2 Remove Saved Collection

- **Endpoint:** `PUT /api/v1/:userId/saved`
- **Description:** Remove a collection from saved collections.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)
- **Body:**

```json
{
    "collectionId": "656e280f547ebc0cd4f00df3"
}
```

### 4.3 Get Saved Collections

- **Endpoint:** `GET /api/v1/:userId/saved`
- **Description:** Get all saved collections of a user.
- **Authorization:** Bearer Token
- **Path Variables:**
  - `userId` (user ID)

**Note:** The API documentation specifies required fields, endpoints, and their descriptions. The examples demonstrate how to use each endpoint with necessary parameters.