const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const cors = require("cors");
const taskRouter = require("./routers/taskRouters");
require('./db/mongoose');
const socketioTaskImpl = require("./socketio/socketioTaskImpl");

socketioTaskImpl(httpServer);

app.use(express.json());
app.use(cors());
app.use(taskRouter);
app.use(express.static(path.join(__dirname, "../client")));

httpServer.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});