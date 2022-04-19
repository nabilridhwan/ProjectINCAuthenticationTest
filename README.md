# Authentication Test

## Setup

1.  Run `npm install` in the root directory to install the dependencies.
2.  Set up the .env file with 3 environment variables:
    -   `COOKIE_SECRET`: The secret for cookies.
    -   `JWT_SECRET`: JSON Web Token secret (used for verification of the JWT).
    -   `PORT`: The port that the server will run on (by default, if omitted, is 3000).
3.  Run the server using `node index.js`.

## Note - Users Simulation

Since we do not have a database to query, we simulate the users using 2 files.

-   `usersSimulation.js`
    -   This contains just one line which is an empty array and returns the array.
-   `usersUtils.js`
    -   This contains utilities that interact with the file above such as `checkIfExists()` and `addUser()`.

With that in mind, note that every re-run of the application, the user array will be empty :).

## Endpoints to test

-   `/auth/signup`

    -   Body request format:

        ```json
        "userID": "int",
        "username": "string",
        "name": "string",
        "email": "string",
        "password": "string"
        "age": "int"
        ```

    -   If user exists
        -   It returns a 400 error
    -   If there are some missing fields
        -   It returns a 400 error
    -   If successful
        -   It returns a 200 status code
        -   It sets the cookie with the JWT which is httpOnly.

-   `/auth/login`
    -   Do this if the cookie is set (i.e. You have created a new user from the endpoint above)
    -   It should return the user data without the password.
-   `/auth/logout`
    -   Removes the cookie. (i.e. Logs the user out)

## Error handling

All error handling is handled by calling the `next()` function and passing a new instance of `HttpError` from the package `http-errors`.

The "next" middleware it calls is in `index.js` and it is the last middleware in the chain.

## Explanation of directories

-   utils
    -   Contains files that facilitate the operation of the server such as jsonwebtoken.js (the reason it's in a separate file is because in testing, we can generate it off one file and use it in another), usersSimulation and usersUtils (which are explained in the note above.)
-   classes

    -   Just classes of User, Admin and Staff. (Both Admin and Staff extends from User)

-   routers
    -   Contains the routers for the server. (For auth, you can find it in `./routers/auth`)
-   test
    -   Test files (using the REST Client) - However, this is not working as the cookie won't persist from one call to the other, so **please use Postman**.
