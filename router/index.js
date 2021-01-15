const app = require('express').Router();
// const token = require('../controller/validateToken').login
const validateToken = require('../controller/validateToken')
//var passport = require('../controller/login')
//var test = require('../controller/validateToken')

app.get('/s', (req, res) => {
    res.send('hello')
})

app.get("/validate",(req, res) => {
    console.log(req.headers.authorization)
    // console.log(jwt.decode(req.headers.authorization, "MY_SECRET_KEY"))
    // res.send("ยอดเงินคงเหลือ 50");
    var validate = new validateToken().checkToken(req);
    res.send(validate)
});


// app.post("/Login",(req,res) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     var getLogin = new validateToken().toLogin(req);
//     console.log("ss "+getLogin)
//     res.send(getLogin);
// })

app.post("/login",async(req,res)=>{

    var signin = await new validateToken().login(req);
    res.send(signin)
})
    
module.exports = app
