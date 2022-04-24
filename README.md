# Authentication Test

## Setup

1.  Run `npm install` in the root directory to install the dependencies.
2.  Copy the `.env.sample` file and rename it to `.env` and fill up the missing values.
3.  Run the server using `node index.js`.

> Read more about "Registering account on behalf of a user" [here](./docs/RegisterAccount).

## Error handling

All error handling is handled by calling the `next()` function and passing a new instance of `HttpError` from the package `http-errors`.

The "next" middleware it calls is in `index.js` and it is the last middleware in the chain.
