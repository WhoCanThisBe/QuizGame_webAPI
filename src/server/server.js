require("dotenv").config();
const fs = require("fs");
const app = require("./app");

// HTTPS for later...
// const server = require("https").createServer(
//     {
//         key: fs.readFileSync("server.key"),
//         cert: fs.readFileSync("server.crt"),
//     },app);

const server = require("http").Server(app);

const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
});