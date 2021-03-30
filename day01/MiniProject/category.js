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
app.get("/api/v1/category", (req,res)=>{
    pool.query(
        "select cate_id, cate_name from category",
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
app.post("/api/v1/category", (req,res)=>{
    const {cate_name} =req.body;
    pool.query(
        "insert into category (cate_name) values ($1)",
        [cate_name],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

//update table use method put menggunakan params

app.put("/api/v1/category/:id", (req,res)=>{
    const {id} = req.params;
    const {cate_name} =req.body;
    pool.query(
        "update category set cate_name = $1 where cate_id= $2",
        [cate_name,id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

app.delete("/api/v1/category/:id", (req,res)=>{
    const {id} = req.params;
    pool.query(
        "delete from category where cate_id=$1",
        [id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
