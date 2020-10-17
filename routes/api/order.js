const express = require('express');
const Menu = require("../../models/menu-item.model");
const Customer = require("../../models/customer.model");
const Order = require("../../models/order.model");

const router = express.Router();

// Get all Orders
router.route("/").get((req, res) => {
    var select = req.query.select;
    Order.find({}, (err, orders) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(orders.length == 0){
                var resposeObject = undefined;
                if(select && select == 'count'){
                    resposeObject = {count: 0};
                }
                return res.status(404).json({msg: "No Orders found", resposeObject});
            } else {
                var responseObject = orders;
                if(select && select == 'count'){
                    responseObject = {count: orders.length};
                }
                return res.status(200).json({msg: "Orders Found", orders});
            }
        }
    });
});

// Get all Orders
router.route("/ready").get((req, res) => {
    var select = req.query.select;
    Order.find({ready: true}, (err, orders) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(orders.length == 0){
                var resposeObject = undefined;
                if(select && select == 'count'){
                    resposeObject = {count: 0};
                }
                return res.status(404).json({msg: "No Orders found", resposeObject});
            } else {
                var responseObject = orders;
                if(select && select == 'count'){
                    responseObject = {count: orders.length};
                }
                return res.status(200).json({msg: "Orders Found", orders});
            }
        }
    });
});

// Find by id
router.route("/:id").get((req, res) => {
    var id = req.params.id;
    Order.findOne({_id: id}, (err, order) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(order === null) return res.status(404).json({msg: "Menu id not found"});
            return res.status(200).json({msg: "Order Found", order});

        }
    });
});

// Make an Order
router.route(`/add/:customerId/:menuItemId`).post((req, res) => {
    console.log('Inside Add new menu item');
    let customerId = req.params.customerId;
    let menuItemId = req.params.menuItemId;

    Customer.findOne({_id: customerId}, (err, customer) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(customer === null){
                return res.status(404).json({msg: "Customer not found"});
            } else {
                Menu.findOne({_id: menuItemId, available: true}, (err, menu_item) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg: err});
                    } else{
                        if(menu_item === null){
                            return res.status(404).json({msg: "Menu Item not Available"});
                        } else {
                            const order = new Order({
                                itemName: menu_item.name,
                                itemId: menuItemId,
                                quantity: req.body.quantity,
                                customerId: customerId,
                                price: menu_item.price,
                                ready: false,
                                pickupTime: req.body.pickupTime,
                                payOnPickup: req.body.payOnPickup,
                            });
                            order
                            .save()
                            .then(() => {
                                console.log('New Order Added');
                                return res.status(200).json({
                                    msg: 'New Order Added',
                                    order
                                });
                            })
                            .catch((err) => {
                                return res.status(403).json({msg: err});
                            });
                        }
                    }
                });
            }
        }
    });
});

// Remove an order
router.route("/remove/:id").delete((req, res) => {
    let id = res.params.id;
    Order.findOneAndDelete({_id: id}, (err, result) => {
            if(err) return res.status(500).json({err: err});
            else{
                if(result === null){
                    return res.status(400).json({msg: "Order not found"});
                }
                const msg = {
                    msg: "Order Removed",
                    id: req.params.id,
                };
                return res.json(msg);
            }
        }
    );
})

module.exports = router;