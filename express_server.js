const express = require("express");
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const app = express();

const port = 3000;


//Middleware
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
//View engine
app.set("view engine", "ejs")
const users = {
    1: {
        id: 1,
        email: "obiwan@gmail.com",
        password: "hellothere"
    },
    2: {
        id: 2,
        email: "hodor@gmail.com",
        password: "hodor"
    },
    3: {
        id: 3,
        email: "dwightSchrute@gmail.com",
        password: "beets"
    }
}


app.get("/", (req, res)=>{
    //There two things
    //user can be assigned to a user object
    //OR
    //user can be assigned to undefined
    // let user;
    // if(req.cookies.user_id){
    //     user = users[req.cookies.user_id]
    // } else {
    //     user = false;
    // }
    res.render("index", {user: users[req.cookies.user_id]})
})

//get for the login(render the login page)
app.get("/login", (req, res)=> {
    res.render("login")
})

//Welcome to user page
// app.get("/:id", (req, res)=> {
//     //We want to send over the users information to the welcome page
//     res.render("welcome", {user: users[req.params.id]})
// })
// app.get("/cats/:id", (req, res)=> {
    
//     //We want to send over the users information to the welcome page
//     res.render("welcome", {user: users[req.params.id]})
// })
//post for the login(make a request to the database)
app.post("/login", (req, res)=> {
    console.log(req.body)
    const emailFromForm = req.body.email;
    const passwordFromForm = req.body.password;
    //loop through our users, and check if the emails match, and then if the password matches
    for(let key in users){
        if(users[key].email === emailFromForm && users[key].password === passwordFromForm){
            // if(users[key].password === passwordFromForm){
                res.cookie("cookie", "oatmeal")
                res.cookie("user_id", users[key].id)
                console.log(req.cookies)
                // console.log("after parse",JSON.parse(req.cookie))
                res.redirect("/")
                return
            // }
        }
    }
    res.status(404).send("I think you made a mistake somewhere")
    // res.redirect("/")
})
app.post("/logout", (req, res)=> {
    res.cookie("user_id", null);
    res.redirect("/")
})


//This checks if the server is listening
app.listen(port, ()=> {
    console.log("This server isn't broken!")
})
