const express = require('express');
const mongoose = require('mongoose');
const Customer = require("../../models/customer.model");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const middleware = require("../../middleware");

const router = express.Router();

// Get all Customers
router.route("/").get((req, res) => {
    var select = req.query.select;
    Customer.find({}, (err, customers) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(customers.length == 0){
                var resposeObject = undefined;
                if(select && select == 'count'){
                    resposeObject = {count: 0};
                }
                return res.status(404).json({msg: "No Customer found", resposeObject});
            } else {
                var responseObject = customers;
                if(select && select == 'count'){
                    responseObject = {count: customers.length};
                }
                return res.status(404).json({msg: "Data Found", customers});
            }
        }
    });
});

// Get customer by Id
router.route("/:id").get((req, res) => {
    var id = req.params.id;
    Customer.findOne({_id: id}, (err, customer) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(customer === null){
                return res.status(404).json({msg: "Customer not found"});
            } else {
                return res.status(200).json({
                    msg: "Customer found",
                    username: req.params.username,
                    customer
                });
            }
            
        }
    });
});

// Register Customer
router.route("/register").post((req, res) => {
    console.log('Inside the register');
    const customer = new Customer({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
    });
    customer
    .save()
    .then(() => {
        console.log('Customer registered');
        return res.status(200).json({
            msg: "Customer Registered",
            customer
        });
    })
    .catch((err) => {
        return res.status(403).json({msg: err});
    });
});

// Update email and Phone number
router.route("/update/:id").put((req, res) => {
    var id = req.params.id;
    Customer.findOne({_id: id}, (err, customer) => {
        if(err){
            console.log(err);
            return res.status(500).json({msg: err});
        } else{
            if(customer === null){
                return res.status(404).json({msg: "Customer not found"});
            } else {
                if(req.body.email){
                    customer.email = req.body.email;
                }
                if(req.body.phone){
                    customer.phone = req.body.phone;
                }

                customer.save((err, updatedCustomer) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg: err});
                    } else {
                        let resp = {
                            msg: `Profile updated successfully`,
                            update: updatedCustomer
                        }
                        return res.status(200).json(resp);
                    }
                });
            }
        }
    });
});

// Remove Customer
router.route("/remove/:id").delete((req, res) => {
    let id = req.params.username;
    Customer.findOneAndDelete(
        {_id: id},
        (err, result) => {
            if(err) return res.status(500).json({err: err});
            else{
                if(result === null){
                    return res.status(400).json({msg: "Customer not found"});
                }
                const msg = {
                    msg: "Customer Removed Successfully",
                    username: req.params.username,
                };
                return res.status(200).json(msg);
            }
        }
    );
})

module.exports = router;