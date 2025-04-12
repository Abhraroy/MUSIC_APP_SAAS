"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB_Connection_1 = require("../DB/DB_Connection");
var server_1 = require("./server");
var Port = process.env.PORT;
//Starting the backend server
(0, DB_Connection_1.DB_connect)().then(function () {
    console.log("PORT:", Port);
    try {
        server_1.default.listen(Port, function () {
            console.log("Your server is running on ".concat(Port));
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("The server could not be started");
    }
});
