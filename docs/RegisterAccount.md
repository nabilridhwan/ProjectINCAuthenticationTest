# Registering an account as an Admin - on behalf of a user (e.g. Staff member)

## How it works

-   Imagine a scenario that an admin wants to get their own employees to onboard, they can do it from one frontend panel.
    1.  The admin register on behalf of the employee (without setting a password for them)
    2.  The employee receives an email from the system indicating that the admin registered an account but they must activate it (and create a password for their account) #

## Note - Email simulation (#)

Because, we don't use actual emails, we simulate them by console logging the link. It should look something like this:

```
You are required to register your account by clicking the link below.

http://localhost:3000/auth/activate?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyIiwibmFtZSI6Ik5hYmlsIFJpZGh3YSIsImVtYWlsIjoibmFicmlkaHdhbkBnbWFpbC5jb20iLCJyb2xlIjoic3RhZmYiLCJpYXQiOjE2NTAzNzE0NzksImV4cCI6MTY1MDM3NTA3OX0.ToRgLcVXyli8dyMdM1ZbjKCIICXdry7qnaPASR-E3YU.

The link will expire in 1 hour.
```

## Endpoints to test

-   POST `/auth/admin/register`
    -   Registers on behalf of "staff".
    -   Requires userID, name, email, age and username as part of the request body.
    -   If successful
        -   The "email simulation" link will console log in the console.
    -   If user exists
        -   Status 400
-   POST `/auth/activate?accessToken=<accessToken>`
    -   Clicking on the link in the "email simulation" will redirect the user to this exact endpoint (with the accessToken as a query parameter). **BUT** its a GET request.
    -   Requires `password` as part of the request body.
-   GET `/dev/auth`
    -   Returns the user data without the password (as part of development)
    -   Requires accessToken as part of its request body and "type" as a query parameter.
        -   "type" accepts "normal" or "register" to alternate between access token got from normal route or register route.
