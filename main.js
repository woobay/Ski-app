const express = require ("express");
const dotenv = require("dotenv");
const routes = require("./controllers/users")
const methodOverride = require("method-override")


const app = express();


dotenv.config({path: "./config.env"})


app.set('view engine', 'ejs');
app.use(express.static("public"))

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(routes)

const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server runnning on port ${port}`)}) 