const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const jwt = require("jwt-simple");
const passport = require("passport");
// const session = require("express-session");

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;

//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "6d37886011e644cff24f80da74a219e3bca3a7a9eb637207c6ff6c8727adfe36";
// const data = require('./data');



var sql = require("mssql");
// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'Padoru'
};

// connect to your database
var err = sql.connect(config)
if (err) console.log(err);




class token {

    token() {
        return;
    }
    checkToken(req) {
        //ทำ Passport Middleware

        passport.authenticate("jwt", { session: false });

        //สร้าง Strategy
        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: SECRET
        };
        const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
            if (payload.sub === "sthang") done(null, true);
            else done(null, false);
        });
        //เสียบ Strategy เข้า Passport
        passport.use(jwtAuth);
        return jwt.decode(req.headers.authorization, SECRET)

    }


    async login(req) {
        var massage;
        var functionName = "Login"
        var user = req.body.username;
        var pass = req.body.password;
        var request = new sql.Request();
        var command = `SELECT * FROM login_user WHERE username = '${user}' AND password = '${pass}'`
        var result = await request.query(command);

        if (result.recordset.length == 0) { //กรณีไม่มีข้อมูลใน list เลย
            massage = {
                status_code: 400,
                status: functionName + " Generate token  fail",
                massage: "User not found "
            }
        } else { //มีข้อมูล
            // console.log(result.recordset)
            const tokenquery = await jwt.encode(result.recordset, SECRET);
            console.log(tokenquery);
            massage = {
                status_code: 201,
                status: functionName + " Generate token success",
                massage: tokenquery
            }
        }
        // return massage


        return massage;
    }
    // returnpassword(req){
    //     var result = { password : data.password , token: jwt.encode(data.password,SECRET)}
    //         if(req.body.username === data.username) 

    //            return result 
    //         else
    //            return "ไม่อนุญาต"
    //      }; 
}


module.exports = token;
