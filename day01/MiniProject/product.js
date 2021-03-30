const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//create pool for pg database
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "qwerty123",
    host: "localhost",
    port: 5432,
    database: "quiz"
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`server listening on port ${port}`));

// query table reqions
app.get("/api/v1/product", (req, res) => {
    pool.query(
        "select prod_id, prod_title, prod_description, prod_stock, prod_condition,prod_manufacture, prod_image, prod_cate_id, prod_price from product",
        [],
        (erorr, result) => {
            if (erorr) {
                throw erorr;
            }
            res.status(200).json(result.rows);
        }
    )

});
app.post("/api/v1/product/", (req, res) => {
    const { prod_title, prod_description, prod_stock, prod_condition, prod_manufacture, prod_image, prod_cate_id, prod_price } = req.body;
    pool.query(
        "insert into product (prod_title, prod_description, prod_stock, prod_condition,prod_manufacture, prod_image, prod_cate_id, prod_price from product) values ($1,$2,$3,$4,$5,$6,$7,$8)",
        [prod_title, prod_description, prod_stock, prod_condition, prod_manufacture, prod_image, prod_cate_id, prod_price],
        (erorr, result) => {
            if (erorr) {
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
app.put("/api/v1/product/:id", (req, res) => {
    const { id } = req.params;
    const { prod_title, prod_description, prod_stock, prod_condition, prod_manufacture, prod_image, prod_cate_id, prod_price } = req.body;
    pool.query(
        "update product set prod_title= $1,prod_description =$2, prod_stock =$3, prod_condition =$4 ,prod_manufacture= $5 , prod_image =$6, prod_cate_id =$7, prod_price = $8 where prod_id= $9",
        [prod_title, prod_description, prod_stock, prod_condition, prod_manufacture, prod_image, prod_cate_id, prod_price, id],
        (erorr, result) => {
            if (erorr) {
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})
app.delete("/api/v1/product/:id", (req, res) => {
    const { id } = req.params;
    pool.query(
        "delete from product where prod_id=$1",
        [id],
        (erorr, result) => {
            if (erorr) {
                throw erorr;

            }
            res.sendStatus(200);
        }

    )
})