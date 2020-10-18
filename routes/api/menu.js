const express = require('express');
const Menu = require("../../models/menu-item.model");

const router = express.Router();

// Get all Menu Items
router.route("/").get((req, res) => {
    var select = req.query.select;
    Menu.find({}, (err, menu) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu.length == 0){
                var resposeObject = undefined;
                if(select && select == 'count'){
                    resposeObject = {count: 0};
                }
                return res.status(404).json({msg: "No Menu Item found", resposeObject});
            } else {
                var responseObject = menu;
                if(select && select == 'count'){
                    responseObject = {count: menu.length};
                }
                return res.status(200).json({msg: "Menu Found", menu});
            }
        }
    });
});


// Get all Available Menu Items
router.route("/available").get((req, res) => {
    var select = req.query.select;
    Menu.find({available: true}, (err, menu) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu.length == 0){
                var resposeObject = undefined;
                if(select && select == 'count'){
                    resposeObject = {count: 0};
                }
                return res.status(404).json({msg: "No Menu Item found", resposeObject});
            } else {
                var responseObject = menu;
                if(select && select == 'count'){
                    responseObject = {count: menu.length};
                }
                return res.status(200).json({msg: "Menu Found", menu});
            }
        }
    });
});

// Find by id
router.route("/id/:id").get((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, menu_item) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu_item === null){
                return res.status(404).json({msg: "Menu Item not found"});
            } else {
                return res.status(200).json({
                    msg: "Menu Item found",
                    menu_item
                });
            }
        }
    });
});

// Find by category
router.route("/category/:category").get((req, res) => {
    var category = req.params.category;
    Menu.find({category: category}, (err, menu_item) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu_item === null){
                return res.status(404).json({msg: "Menu Item with that category not found"});
            } else {
                return res.status(200).json({
                    msg: "Menu item found",
                    menu_item
                })
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
        return res.status(200).json({
            msg: 'New Menu Item Added',
            name: req.body.name,
            category: req.body.category
        });
    })
    .catch((err) => {
        return res.status(403).json({msg: err});
    });
});

// Set menu-item as available
router.route("/update/available/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, menu_item) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu_item === null){
                return res.status(404).json({msg: "Id not found"});
            } else {
                menu_item.available = true;

                menu_item.save((err, updatedMenuItem) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg: err});
                    } else {
                        let resp = {
                            msg: `${updatedMenuItem.name} is now available`,
                            update: updatedMenuItem
                        }
                        return res.status(200).json(resp);
                    }
                });
            }
        }
    });
});

// Set menu-item as unavailable
router.route("/update/unavailable/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, menu_item) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu_item === null){
                return res.status(404).json({msg: "Id not found"});
            } else {
                menu_item.available = false;

                menu_item.save((err, updatedMenuItem) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg: err});
                    } else {
                        let resp = {
                            msg: `${updatedMenuItem.name} is now unavailable`,
                            update: updatedMenuItem
                        }
                        return res.status(200).json(resp);
                    }
                });
            }
        }
    });
});

// Update menu-item Info
router.route("/update/:id").put((req, res) => {
    var id = req.params.id;
    Menu.findOne({_id: id}, (err, menu_item) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(menu_item === null){
                return res.status(404).json({msg: "Id not found"});
            } else {
                //If you are updating from body
                if(req.body.name){
                    menu_item.name = req.body.name;
                }
                if(req.body.category){
                    menu_item.category = req.body.category;
                }
                if(req.body.price){
                    menu_item.price = req.body.price;
                }
                if(req.body.currency){
                    menu_item.currency = req.body.currency;
                }
                if(req.body.photo){
                    menu_item.photo = req.body.photo;
                }

                menu_item.save((err, updatedMenuItem) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg: err});
                    } else {
                        var resp = {
                            msg: "Info Updated Successfully",
                            update: updatedMenuItem
                        }
                        return res.status(200).json(resp);
                    }
                });
            }
        }
    });
});

// Remove Menu Item
router.route("/remove/:id").delete((req, res) => {
    let id = req.params.id;
    Menu.findOneAndDelete({_id: id},
        (err, result) => {
            if(err) return res.status(500).json({err: err});
            else{
                if(result === null){
                    return res.status(400).json({msg: "Menu Item is not found"})
                }
                const msg = {
                    msg: "MenuItem Removed",
                    id: req.params.id,
                };
                return res.status(200).json(msg);
            }
        }
    );
})

module.exports = router;