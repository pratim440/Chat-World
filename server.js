const express = require ("express");

const app = express();
const http = require("http").createServer(app);
// app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

// SOCKET

const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("Connected");
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

http.listen(port, function(err) {
    if(!err) {
        console.log('Server started successfully');
    }
});

