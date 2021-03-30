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
app.get("/api/v1/province", (req,res)=>{
    pool.query(
        "select prov_id, prov_name from province",
        [],
        (erorr,result)=>{
            if(erorr){
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )
});

app.post("/api/v1/province", (req,res)=>{
    const {prov_name} =req.body;
    pool.query(
        "insert into province (prov_name) values ($1)",
        [prov_name],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

app.put("/api/v1/province/:id", (req,res)=>{
    const {id} = req.params;
    const {prov_name} =req.body;
    pool.query(
        "update province set prov_name = $1 where prov_id= $2",
        [prov_name,id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

app.delete("/api/v1/province/:id", (req,res)=>{
    const {id} = req.params;
    pool.query(
        "delete from province where prov_id=$1",
        [id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
