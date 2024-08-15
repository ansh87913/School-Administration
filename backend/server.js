const express = require("express");
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const classroomRouter = require('./routes/classroom');
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.set("strictQuery", true);
// mongoose.connect("mongodb://127.0.0.1:27017/schoolAdministration");
mongoose.connect("mongodb+srv://anshjain0209:rI8tS2WfFmYVqWuv@cluster0.qzit8.mongodb.net/schoolAdministration");
var db = mongoose.connection;
db.on("open", ()=>console.log("Connected to database"));
db.on("error", ()=>console.log("Error occurred while connecting with db"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/auth", authRouter);
app.use("/classroom", classroomRouter);

app.listen(5000,()=>{
    console.log("Server started at 5000");
});
