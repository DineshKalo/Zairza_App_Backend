require('dotenv').config();
const express = require("express")
// const bodyparser = require("body-parser")
const PORT = process.env.PORT || 4600
const event = require("./routes/router_event")
const auth = require("./routes/authentication")
const profiles = require("./routes/profiles")
const fileUpload = require("./routes/fileUpload")
const inventory = require("./routes/inventoryRouter")
const roadmap = require("./routes/roadmapRouter")
const sessionPresentation = require("./routes/sessionPresentationRouter")
const video = require("./routes/videoRouter")
const projects= require("./routes/route_project")
const blogs= require("./routes/blog_routes")

const app = express();

// app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());

app.use("/zairza",event);
app.use("/zairza",auth);
app.use("/zairza",profiles);
app.use("/zairza",fileUpload);
app.use("/zairza",inventory);
app.use("/zairza",roadmap);
app.use("/zairza",sessionPresentation);
app.use("/zairza",video);
app.use("/zairza",projects);
app.use("/zairza",blogs);

//Connecting Database
const dataBase = require("./mongoDB/mongo_conn");
dataBase.connect();

app.listen(PORT, (req,res)=>{
    console.log("Server Running on: "+PORT);
})

app.get("/", (req,res)=>{
    res.send("Welcome to Zairza!")
})