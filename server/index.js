import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport"
import connectMongo from "connect-mongo";
import session from "express-session"


import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const MongoStore = connectMongo(session);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
  app.listen(PORT, () => console.log(`Server was ranning on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use("", userRoutes);