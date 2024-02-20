const express = require("express");
const app = express();
const { Restaurant, Menu, Item } = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: Menu,
        inculue: [{
            model: Menu,
            include: [{
                model: Item
            }]
        }]
    });
    res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const myRestaurant = await Restaurant.findByPk(id);
    res.json(myRestaurant);
});

app.post('/restaurants', async (req,res) => {
    const restraunt = await Restaurant.create(req.body);
    res.json(restraunt);
});

app.put('/restaurants/:id', async (req,res) => {
    const id = req.params.id;
    await Restaurant.update(req.body, {where: {id: id}, returning: true, plain: true});
    const myRestaurant = await Restaurant.findByPk(id);
    res.json(myRestaurant);
});

app.delete('/restaurants/:id', async (req,res) => {
    const id = req.params.id;
    const deletedRest = await Restaurant.destroy({where: {id: id}});
    res.json(deletedRest);
});



module.exports = app;