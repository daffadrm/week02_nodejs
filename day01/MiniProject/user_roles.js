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
app.get("/api/v1/user_roles", (req,res)=>{
    pool.query(
        "select user_id, role_id from user_roles",
        [],
        (erorr,result)=>{
            if(erorr){
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )

});

//insert
app.post("/api/v1/user_roles", (req,res)=>{
    const {user_id, role_id} =req.body;
    pool.query(
        "insert into user_roles (user_id, roles_id) values ($1,$2)",
        [user_id, role_id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
app.put("/api/v1/user_roles/:id", (req,res)=>{
    const {id} =req.params;
    const {user_id,role_id} = req.params;
    //const {cate_name} =req.body;
    pool.query(
        "update user_roles set user_id = $1, role_id =$2 where cate_id= $2",
        [user_id,role_id,id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
app.delete("/api/v1/user_roles/:id", (req,res)=>{
    const {id} = req.params;
    pool.query(
        "delete from user_roles where user_id=$1",
        [id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})