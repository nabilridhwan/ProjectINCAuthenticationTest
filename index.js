const app = require("./app");
const CONFIG = require("./utils/config");
const port = CONFIG.PORT;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
