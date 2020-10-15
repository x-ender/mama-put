const express = require('express');
const Customer = require("../../models/customer.models");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const middleware = require("../../middleware");

const router = express.Router();

router.route("/:username").get((req, res) => {
    Customer.findOne({username: req.params.username},
        (err, result) => {
            if(err) res.status(500).json({msg: err});
            res.json({
                data: result,
                username: req.params.username,
            });
        });
});

router.route("/login").post((req, res) => {
    Customer.findOne({username: req.body.username},
        (err, result) => {
            if(err) return res.status(500).json({msg: err});
            if(result === null){
                return res.status(403).json("Username incorrect")
            }
            if(result.password === req.body.password){
                // here we implement the JWT token functionality
                let token = jwt.sign({username:req.body.username}, config.key, {
                    expiresIn: "24h", //expire in 24 hours
                });
                res.json({
                    token: token,
                    msg: "success",
                });
            }
            else{
                res.status(403).json("Password is incorrect")
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
        res.status(200).json('Registered');
    })
    .catch((err) => {
        res.status(403).json({msg: err});
    });
});

// Update Phone number
router.route("/update/:username").patch((req, res) => {
    Customer.updateOne(
        {username: req.params.username},
        {$set: {phone: req.body.phone}},
        (err, result) => {
            if(err) return res.status(500).json({msg: err});
            const msg = {
                msg: "Phone Number updated successfully",
                username: req.params.username,
                phone: req.body.phone,
            };
            return res.json(msg);
        }
    );
});

// Remove Customer
router.route("/remove/:username").delete((req, res) => {
    Customer.findOneAndDelete(
        {username: req.params.username},
        (err, result) => {
            if(err) return res.status(500).json({
                msg: "Customer does not exist",
                err: err
            });
            const msg = {
                msg: "Customer Removed",
                username: req.params.username,
            };
            return res.json(msg);
        }
    );
})

module.exports = router;