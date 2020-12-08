const express = require('express');
const mysql = require('mysql');
const app = express();

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

// pripojenie
var connection = mysql.createConnection({
    host     : 'mydb',
    user     : 'root',
    password : 'root',
    database : 'dbtest'
});

//test databazy
app.get('/test', (req, res)=>{
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    res.send(results[0].solution.toString());
  });
});

//data z databazy
app.get('/list', (req, res)=>{
  connection.query('SELECT * FROM produkt', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    res.json(results);
  });
});

//vytvorenie databazy
app.get('/database/create', (req, res)=>{
  connection.query('CREATE DATABASE dbtest', (error, results, fields) => {
    if (error) throw error;
    console.log('database dbtest created');
    res.json(results);
  });
});

// vytvorenie tabulky produkt
app.get('/database/create/produkt', (req, res)=>{
  var sql = 'CREATE TABLE produkt (id int unsigned NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,picture_path varchar(255) NOT NULL, price int NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('produkt table created');
    res.json(results);
  });
});

// vytvorenie tabulky costumer
app.get('/database/create/costumer', (req, res)=>{
  var sql = 'CREATE TABLE costumer (id int unsigned NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,picture_path varchar(255) NOT NULL, price int NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('costumer table created');
    res.json(results);
  });
});

// vytvorenie tabulky order
app.get('/database/create/orders', (req, res)=>{
  var sql = 'CREATE TABLE orders (id int unsigned NOT NULL AUTO_INCREMENT, id_costumer int unsigned NOT NULL, state_of_order varchar(255) NOT NULL, PRIMARY KEY (id), KEY id_costumer (id_costumer), CONSTRAINT order_ibfk_1 FOREIGN KEY (id_costumer) REFERENCES costumer (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('order table created');
    res.json(results);
  });
});

// vytvorenie tabulky order_item
app.get('/database/create/order_item', (req, res)=>{
  var sql = 'CREATE TABLE order_item (id int unsigned NOT NULL AUTO_INCREMENT, id_order int unsigned NOT NULL, id_produkt int unsigned NOT NULL, number_of_produkts int(10) unsigned zerofill NOT NULL, PRIMARY KEY (id), KEY id_order (id_order), KEY id_produkt (id_produkt), CONSTRAINT order_item_ibfk_1 FOREIGN KEY (id_order) REFERENCES orders (id), CONSTRAINT order_item_ibfk_2 FOREIGN KEY (id_produkt) REFERENCES produkt (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('order_item table created');
    res.json(results);
  });
});

// vytvorenie tabulky counter
app.get('/database/create/counter', (req, res)=>{
  var sql = 'CREATE TABLE counter (id int unsigned NOT NULL AUTO_INCREMENT, id_costumer int unsigned NOT NULL, count int(10) unsigned zerofill NOT NULL, PRIMARY KEY (id), KEY id_costumer (id_costumer), CONSTRAINT counter_ibfk_1 FOREIGN KEY (id_costumer) REFERENCES costumer (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('counter table created');
    res.json(results);
  });
});

//seeding dat do databazy do tabulky produkt
app.get('/database/seed', (req, res) =>{
  var str = 'INSERT INTO produkt (name,picture_path,price) VALUES';
  var modded = dbprodukt.map(e =>{
    return '(\''+e.name+'\',\''+e.picture_path+'\',\''+e.price+'\')'
  });
  str += modded.join(',');
  str += ';';

  connection.query(str, (error, results, fields) => {
    if (error) throw error;
    console.log('data seeded');
  });
});


// "...ukoncovat nebudeme budeme hnusny momentalne..." Bronis
//connection.end();

app.listen(8081,()=>{
  console.log('listening at 8081');
  // pripajanie do DB
  connection.connect();  
});