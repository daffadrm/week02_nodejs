const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//create pool for pg database
const Pool = require ('pg').Pool;
const pool = new Pool ({
    user : "postgres",
    password : "qwerty123",
    host : "localhost",
    port : 5432,
    database : "quiz"
});

const app = express ();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = process.env.PORT || 1337;
app.listen(port, ()=> console.log(`server listening on port ${port}`));

// query table reqions
app.get("/api/v1/users", (req,res)=>{
    pool.query(
        "select user_id, user_name, user_email, user_password from users",
        [],
        (erorr,result)=>{
            if(erorr){
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )

});
app.post("/api/v1/users", (req,res)=>{
    const {user_id,user_name, user_email, user_password} =req.body;
    pool.query(
        "insert into users (user_id, user_name, user_email, user_password) values ($1,$2,$3,$4)",
        [user_id,user_name, user_email, user_password],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
});

app.put("/api/v1/users/:id", (req,res)=>{
    const {id} = req.params;
    const {user_name, user_email, user_password} =req.body;
    pool.query(
        "update users set user_name=$1, user_email=$2, user_password= $3 where user_id= $4",
        [user_name, user_email, user_password,id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

app.delete("/api/v1/users/:id", (req,res)=>{
    const {id} = req.params;
    pool.query(
        "delete from users where user_id=$1",
        [id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})