const express = require('express');
const Menu = require("../../models/menu-item.model");
const Customer = require("../../models/customer.model");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const middleware = require("../../middleware");
const e = require('express');

const router = express.Router();

// Find by id
router.route("/id/:id").get((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
        } else{
            if(!foundObject){
                res.status(404).json({msg: "Menu id not found"});
            } else {
                res.send(foundObject);
            }
        }
    });
});

// Find by category
router.route("/category/:category").get((req, res) => {
    var category = req.params.category;
    Menu.find({category: category}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
        } else{
            if(!foundObject){
                res.status(404).json({msg: "Menu category not found"});
            } else {
                res.send(foundObject);
            }
        }
    });
});

// Add Menu Item to Menu
router.route("/add").post((req, res) => {
    console.log('Inside Add new menu item');
    const menuItem = new Menu({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        currency: req.body.currency,
        available: req.body.available,
        photo: req.body.photo,
    });
    menuItem
    .save()
    .then(() => {
        console.log('New Menu Item Added');
        res.status(200).json({
            msg: 'New Menu Item Added',
            name: req.body.name,
            category: req.body.category
        });
    })
    .catch((err) => {
        res.status(403).json({msg: err});
    });
});

// Set menu-item as available
router.route("/update/available/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
        } else{
            if(!foundObject){
                res.status(404).json({msg: "Id not found"});
            } else {
                foundObject.available = true;

                foundObject.save((err, updatedObject) => {
                    if(err){
                        console.log(err);
                        res.status(500).json({msg: err});
                    } else {
                        res.send(updatedObject);
                    }
                });
            }
        }
    });
});

// Set menu-item as unavailable
router.route("/update/unavailable/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
        } else{
            if(!foundObject){
                res.status(404).json({msg: "Id not found"});
            } else {
                foundObject.available = false;

                foundObject.save((err, updatedObject) => {
                    if(err){
                        console.log(err);
                        res.status(500).json({msg: err});
                    } else {
                        res.send(updatedObject);
                    }
                });
            }
        }
    });
});

// Update menu-item Info
router.route("/update/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
        } else{
            if(!foundObject){
                res.status(404).json({msg: "Id not found"});
            } else {
                //If you are updating from body
                if(req.body.name){
                    foundObject.name = req.body.name;
                }
                if(req.body.category){
                    foundObject.category = req.body.category;
                }
                if(req.body.price){
                    foundObject.price = req.body.price;
                }
                if(req.body.currency){
                    foundObject.currency = req.body.currency;
                }
                if(req.body.photo){
                    foundObject.photo = req.body.photo;
                }

                foundObject.save((err, updatedObject) => {
                    if(err){
                        console.log(err);
                        res.status(500).json({msg: err});
                    } else {
                        var resp = {
                            msg: "Info Updated Successfully",
                            update: updatedObject
                        }
                        res.json(resp);
                    }
                });
            }
        }
    });
});

// Remove Customer
router.route("/remove/:id").delete((req, res) => {
    Menu.findOneAndDelete(
        {_id: req.params.id},
        (err, result) => {
            if(err) return res.status(500).json({
                msg: "Id does not exist",
                err: err
            });
            const msg = {
                msg: "MenuItem Removed",
                id: req.params.id,
            };
            return res.json(msg);
        }
    );
})

module.exports = router;