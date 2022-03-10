const express = require ("express");
const homecontroller = require ("./controller/homeControllers");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

app.get('/', homecontroller.renderLogin); 

app.get('/signup', homecontroller.renderSignup);
app.post('/signup', homecontroller.renderNewUser)

app.get('/profil', homecontroller.renderProfil);


app.listen(3000, ()=>{console.log("Server runnning on port 3000")})