const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

// Server port
const PORT = process.env.PORT || 5000;

// MongoDB database url
const URL = "mongodb://localhost:27017/papatho";

// events
const events = require("./events/OnSocketEvents");

const router = require("./router");

io.on("connection", socket => {
  console.log("We have a new connection.");
  events(io, socket);
});

app.use(router);

mongoose
  .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() =>
    server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
  )
  .catch(error => console.log(error));
