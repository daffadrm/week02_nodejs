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

// query table reqionsm
app.get("/api/v1/city", (req,res)=>{
    pool.query(
        "select city_id, city_name, city_prov_id from city",
        [],
        (erorr,result)=>{
            if(erorr){
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )

});

app.post("/api/v1/city", (req,res)=>{
    const {city_name, city_prov_id} =req.body;
    pool.query(
        "insert into city (city_name, city_prov_id) values ($1,$2)",
        [city_name, city_prov_id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
});

app.put("/api/v1/city/:id", (req,res)=>{
        const {id} = req.params;
        const {city_name, city_prov_id} =req.body;
        pool.query(
            "update city set city_name =$1, city_prov_id = $2 where city_id= $3",
            [city_name,city_prov_id,id],
            (erorr,result)=>{
                if(erorr){
                    throw erorr;
    
                }
                res.sendStatus(200);
            }
    
        )
    })

    app.delete("/api/v1/city/:id", (req,res)=>{
        const {id} = req.params;
        pool.query(
            "delete from city where city_id=$1",
            [id],
            (erorr,result)=>{
                if(erorr){
                    throw erorr;
    
                }
                res.sendStatus(200);
            }
    
        )
    })