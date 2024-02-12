const express = require("express");
const { sequelize} = require("./sequelize/models");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
const tokenRoute = require("./routes/token")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");


const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
app.use(cookieParser());

// Routers defining

app.use("/todos", todoRouter);
app.use("/users", userRouter);
app.use("/tokens",tokenRoute)


const {
  checkAndDeleteExpiredTokens,
} = require("./controllers/tokenController");
cron.schedule("0 * * * *", async () => {
  console.log("Checking and deleting expired tokens...", new Date());
  await checkAndDeleteExpiredTokens();
});

app.listen({ port: 5001 }, async () => {
  console.log("server up on http://localhost:5001");
  await sequelize.authenticate();
  console.log("DataBase is Connected");
  // console.log({
  //   expiresAt: new Date(Date.now() + 60 * 1000),
  //   [sequelize.Sequelize.Op.lt]: new Date(),
  // });
});
