const express = require("express");
require("dotenv").config();
const socket = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const db = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/user");
const friendsRouter = require("./routes/frineds");
const likesRouter = require("./routes/likes");
const searchRouter = require("./routes/search");
const homeRouter = require("./routes/home");
const countingRouter = require("./routes/counting");
const shareRouter = require("./routes/sharedPost");
const conversationRouter = require("./routes/conversation");
const messagesRouter = require("./routes/message");


app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/admin", usersRouter);
app.use("/friends", friendsRouter);
app.use("/likes", likesRouter);
app.use("/search", searchRouter);
app.use("/home", homeRouter);
app.use("/count", countingRouter);
app.use("/share", shareRouter);
app.use("/conversation", conversationRouter);
app.use("/messages", messagesRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

//declare the socket.io, whick will work on my server
//instance the server
// origin => * (everywhere)
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  // const results = users.filter((user) => {
  //   return user.userId === userId;
  // });

  // if (results.length !== 0) {
  //   // if the user is not exsisted in the users array, add him
  //   users.push({ userId, socketId });
  // }

  !users.some((user) => user.userId == userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  //filter the users array, if anyone is left
  users = users.filter((user) => {
    return user.socketId !== socketId;
  });
};

const getUser = (userId) => {
  // console.log(userId);
  const receiver = users.find((user) => {
    // console.log(user);
    return user.userId == userId;
  });
  return receiver;
};

//connection emits in the backsecene, i will receive it (connect to sockit io server)
io.on("connection", (socket) => {
  // `socket.id` is the id assigned to the user that connected
  console.log(`${socket.id} is connected`);
  // io.emit("welcome", "hello this is socket server");

  //take the socket id, and the user id, and save it in the users array after the connection
  //*on => i will receive the user id from the frontend
  socket.on("ADD_USER", (userId) => {
    // if i push the user id and the socket id directly without checking if the user is already exsisted in the array, i will have a duplicate data
    addUser(userId, socket.id);

    //send the users array to the frontend
    io.emit("GET_USERS", users);
    console.log(users);
  });

  //send messages
  socket.on("SEND_MESSAGE", ({ sender_id, receiver_id, text }) => {
    console.log(sender_id, receiver_id, text);
    const user = getUser(receiver_id);
    console.log(user);
    io.to(user.socketId).emit("GET_MESSAGE", {
      sender_id,
      receiver_id,
      text,
    });
  });

  socket.on("DISCONNECT", () => {
    console.log("user left");
    removeUser(socket.id);
    io.emit("GET_USERS", users);
    console.log(users);
  });
});
