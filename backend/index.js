const express = require("express");
const cors = require("cors")

const PORT = 3000;
const app = express()

app.use(cors())
app.use(express.json())

const mainRouter = require("./Routes/index");

app.use("/api/v1/", mainRouter)

app.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

app.listen( PORT , (err) => {
    if(err) console.log(err);
    console.log("Server is listening on port :"+ PORT);
})


