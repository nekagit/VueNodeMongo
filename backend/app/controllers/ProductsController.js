const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const url =
  "mongodb+srv://njoca:ECfsAUI5CxrMONug@shop.oldvczw.mongodb.net/";
const connection = mongoose.createConnection(url);

const shopModal = require("../models/ShopModel.js");
const Product = connection.model("Product", shopModal.ProductS);

const createProduct = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Name can not be empty!" });
    }
    console.log(req.body)
    const newProduct = new Product({ // Change variable name from 'Product' to 'newProduct'
      name: req.body.name,
      unitPrice: req.body.unitPrice,
    });
    const data = await newProduct.save(); // Use 'newProduct' instead of 'Product'
    console.log(data)
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

const findAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving prijave.",
    });
  }
};

const findProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "Not found Product with id " + req.params.id });
    }
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving Product with id=" + req.params.id });
  }
};

// Route handler for updating a Product by id
const updateProductById = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      return res.status(404).send({
        message: `Cannot update Product with id=${req.params.id}. Maybe Product was not found!`,
      });
    }
    res.send({ message: "Product was updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating Product with id=" + req.params.id });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const data = await Product.findByIdAndRemove(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!`,
      });
    }
    res.send({ message: "Product was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Could not delete Product with id=" + req.params.id });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const data = await Product.deleteMany({});
    res.send({
      message: `${data.deletedCount} Prijave were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all prijave.",
    });
  }
};

// Define the routes
router.post("/", createProduct);
router.get("/", findAllProducts);
router.get("/:id", findProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
router.delete("/", deleteAllProducts);

module.exports = router;
