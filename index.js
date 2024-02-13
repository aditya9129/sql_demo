const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require("express");
const app=express();
const path=require("path");
var methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password:'Aditya@9129'
});

app.get("/",(req,res)=>{
    let q="SELECT COUNT(*) FROM user";
    try{
        connection.query(q,(err,results)=>{
        if(err)throw err;
        console.log(results);
       let cnt= results[0]["COUNT(*)"]
        res.render("home.ejs",{cnt});
    })
    }catch(err){
            console.log(err);

    }
});
app.get("/user",(req,res)=>{
    let q="SELECT * FROM user";
    try{
        connection.query(q,(err,users)=>{
        if(err)throw err;
        res.render("showuser.ejs",{users});
    })
    }catch(err){
            console.log(err);

    }
})
app.get("/user/:id/edit",(req,res)=>{
let {id}=req.params;
let q=`SELECT * FROM user WHERE id='${id}'`;
try{
    connection.query(q,(err,user)=>{
    if(err)throw err;
    

    
    res.render("edit.ejs",{user});
})
}catch(err){
        console.log(err);

}
})
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let newusername=req.body.username;
    let password=req.body.password;
    let q=`UPDATE user SET username='${newusername}' WHERE id='${id}' AND password='${password}'`;
    try{
        connection.query(q,(err,result)=>{
        console.log(result);
        if(err)throw err;
        if (result.affectedRows === 0) {
            return res.send("Wrong password");
        }
        res.redirect("/user");
    })
    }catch(err){
            res.send("wrong password");
    
    }
})
app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    let password=req.body.password;
    let q=`DELETE FROM user WHERE id='${id}' AND password='${password}'`;
    try{
        connection.query(q,(err,result)=>{
        console.log(result);
        if(err)throw err;
        if (result.affectedRows === 0) {
            return res.send("Wrong password");
        }
        res.redirect("/user");
    })
    }catch(err){
            res.send("wrong password");
    
    }
})
app.listen("8000");



















// let data=[];

// let createRandomUser=()=> {
//   return [
//     faker.string.uuid(),
//     faker.internet.userName(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// }
// for(let i=0;i<100;i++){
//     data.push(createRandomUser());
// }
// let query="INSERT INTO USER (id,username,email,password) VALUES ?"
// try{
//    connection.query(query,[data],(err,results)=>{
//         if(err)throw err;
//         console.log(results);
//    })
// }catch(err){
//     console.log(err);
// }
// connection.end();
// console.log(createRandomUser());