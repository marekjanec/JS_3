//cerpana inspiracia aj z https://kb.objectrocket.com/postgresql/nodejs-express-postgresql-tutorial-part-1-960
// a z  z https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm

const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
var cookieParser = require('cookie-parser');

// create a new Express app server object
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors
app.use(cors())
//CORS middleware


// cookies
app.use(session({
    name: 'sessionID',
    secret: 'nemamradjs',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10000000000 }
}))

// set the port for the Node application
const port = process.env.port || 8080;

// set the file path for the HTML file
const htmlPath = path.join(__dirname + "/index.html");

const {Pool, Client} = require('pg')

const pool = new Pool({
user: "postgres",
host: "localhost",
database: "js",
password: "admin",
port: "5432"
})

//seed pre produkty
var dbprodukt = [
    {
      name: 'produkt_1',
      picture_path: 'databaza,pictures,Portrait_placeholder.png',
      price: 10
    },
    {
      name: 'produkt_2',
      picture_path: "databaza,pictures,Portrait_placeholder.png",
      price: 15
    },
    {
      name: 'produkt_3',
      picture_path: 'databaza,pictures,Portrait_placeholder.png',
      price: 20
    }
  ];

//prosto get
app.get("/", cors(), (req, resp) => {
    if(req.session.page_views){
        req.session.page_views++;
        resp.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        resp.send("Welcome to this page for the first time!");
     }
    
    // send the HTML file back to the front end
    resp.sendFile(htmlPath);
});

app.post("/addToCart", cors(), (req, resp) => {
    //console.log(req);
    //console.log(req.session);

    var str = 'INSERT INTO cart (id_product,amount,id_session) VALUES';
    str += '(\''+req.body.id_product+'\',\''+req.body.amount+'\',\''+req.sessionID+'\');';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    
    // send the HTML file back to the front end
    resp.send("Pridane do kosika");
});

//vlozenie produktu
app.post('/insertProduct', cors(), function (req, resp) {

    console.log(req.body);

    var str = 'INSERT INTO product (name,picture,price) VALUES';
    var modded = dbprodukt.map(e =>{
        return '(\''+e.name+'\',\''+e.picture+'\',\''+e.price+'\')'
    });
    str += modded.join(',');
    str += ';';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    resp.json('pridany produkt');
});

//vytvorenie obejdnavky
app.post('/createOrder', cors(), function (req, resp) {

    console.log(req.body);

    var str = 'INSERT INTO orders (id_costumer,order_state) VALUES';
    str += '('+req.body.id_costumer+',\'notFinished\');';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    resp.json('order created');
});

//odoslanie obejdnavky
app.post('/paidOrder', cors(), function (req, resp) {

    console.log(req.body);

    var str = 'UPDATE orders SET order_state = \'paid\' WHERE id = ';
    str += '\''+req.body.id_order+'\';';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    resp.json('order sended');
});

//pridanie polozky do objednavky
app.post('/addItem', cors(), function (req, resp) {

    console.log(req.body);

    var str = 'INSERT INTO order_item (id_order,id_product,amount) VALUES';
    str += '(\''+req.body.id_order+'\',\''+req.body.id_product+'\',\''+req.body.amount+'\')';
    str += ';';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    resp.json('item added');
});


//pridanie zakaznika do databazy
app.post('/addCostumer', cors(), function (req, resp) {
    var cartItems; 
    var id_costumer;
    var id_order;

    console.log(req.body);

    var str = 'INSERT INTO costumer (name, address, city, zip) VALUES';
    str += '(\''+req.body.name+'\',\''+req.body.address+'\',\''+req.body.city+'\',\''+req.body.zip+'\') RETURNING * ;';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
        id_costumer = res.rows[0].id

        var str = 'INSERT INTO orders (id_costumer,order_state) VALUES';
        str += '('+id_costumer+',\'notPaid\') RETURNING * ;';

        pool.query(str, (err, res) => {
            console.log(err, res);
            id_order = res.rows[0].id;

            // nacitanie obsahu kosika
            //var str = 'SELECT name, picture, price, amount FROM public.product INNER JOIN public.cart ON product.id = cart.id_product WHERE';
            var str = 'SELECT * FROM public.product INNER JOIN public.cart ON product.id = cart.id_product;';

            pool.query(str, (err, res) => {
                console.log(err, res.rows);
                resp.json(res.rows);
                
                cartItems = res.rows;

                var str = 'INSERT INTO order_item (id_order,id_product,amount) VALUES';
                var modded = cartItems.map(e =>{
                    return '(\''+id_order+'\',\''+e.id_product+'\',\''+e.amount+'\')'
                });
                str += modded.join(',');
                str += ';';

                console.log(str)

                pool.query(str, (err, res) => {
                    console.log(err, res);
                });

                str = 'DELETE FROM cart;';

                pool.query(str, (err, res) => {
                    console.log(err, res);
                });
            });     
        });
    });
});

//pripocitanie k pocitadlu
app.post('/counter',cors(), function (req, resp) {

    console.log(req.body);

    var str = 'UPDATE counter SET counting = counting + \'1\' WHERE id = \'1\';';

    console.log(str);

    pool.query(str, (err, res) => {
        console.log(err, res);
    });
    resp.json('count += 1');
});


// vratenie produktov
app.get("/getProducts",cors(), (req, resp) => {
    pool.query('SELECT * FROM public.product;', (err, res, fields) => {
        console.log(err, res.rows);
        resp.json(res.rows);
    });
    
});

// vratenie zakaznikov
app.get("/getCostumers",cors(), (req, resp) => {
    pool.query('SELECT * FROM public.costumer;', (err, res, fields) => {
        console.log(err, res.rows);
        resp.json(res.rows);
    });
    
});

// vratenie objednavok
app.get("/getOrders",cors(), (req, resp) => {
    pool.query('SELECT * FROM public.costumer INNER JOIN public.orders ON orders.id_costumer = costumer.id;', (err, res, fields) => {
        console.log(err, res.rows);
        resp.json(res.rows);
    });
    
});

app.get("/cart",cors(), (req, resp) => {
    //var str = 'SELECT name, picture, price, amount FROM public.product INNER JOIN public.cart ON product.id = cart.id_product WHERE';
    var str = 'SELECT * FROM public.product INNER JOIN public.cart ON product.id = cart.id_product;';

    pool.query(str, (err, res) => {
        console.log(err, res.rows);
        resp.json(res.rows);
    });
    
});

// vratenie info o objednavkach
app.get("/getInfo",cors(), (req, resp) => {
    var str = 'SELECT * FROM public.order_item INNER JOIN public.product ON order_item.id_product = product.id WHERE order_item.id_order = ';
    str += req.query.id_order.replace(':','');
    str += ';';

    console.log(str);

    pool.query(str, (err, res, fields) => {
        console.log(err, res.rows);
        resp.json(res.rows);
    });
    
});


var server = app.listen(port, function () {
console.log(`\nPostgres Node server is running on port: ${server.address().port}`)
});
