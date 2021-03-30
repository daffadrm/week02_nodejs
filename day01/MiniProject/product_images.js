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
app.get("/api/v1/product_images", (req,res)=>{
    pool.query(
        "select prim_id,prim_file_name,prim_path,prim_prod_id from product_images",
        [],
        (erorr,result)=>{
            if(erorr){
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )

});
app.post("/api/v1/product_images", (req,res)=>{
    const {prim_file_name,prim_path,prim_prod_id} =req.body;
    pool.query(
        "insert into product_images (prim_file_name,prim_path,prim_prod_id from product_images) values ($1,$2,$3)",
        [prim_file_name,prim_path,prim_prod_id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
app.put("/api/v1/product_images/:id", (req,res)=>{
    const {id} = req.params;
    const { prim_file_name,prim_path,prim_prod_id } =req.body;
    pool.query(
        "update product_images set prim_file_name =$1,prim_path=$2 ,prim_prod_id = $3 where prim_id= $4",
        [prim_file_name, prim_path, prim_prod_id, id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})

app.delete("/api/v1/product_images/:id", (req,res)=>{
    const {id} = req.params;
    pool.query(
        "delete from product_images where prim_id=$1",
        [id],
        (erorr,result)=>{
            if(erorr){
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})