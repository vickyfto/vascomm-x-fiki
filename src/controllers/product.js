const ProductModel = require("../models/product");

const getProducts = async (req, res) => {
  const { p, q } = req.query;
  try {
    let user;
    if (q) {
      user = await ProductModel.find({
        name: { $regex: new RegExp(q, "i") },
      }).sort({ _id: -1 });
    } else {
      user = await ProductModel.find().sort({ _id: -1 });
    }

    const pageCount = Math.ceil(user.length / 10);
    let page = parseInt(p);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }

    res.status(200).json({
      page: page,
      pageCount: pageCount,
      data: user.slice(page * 10 - 10, page * 10),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, qty } = req.body;

  const newProduct = new ProductModel({
    name,
    qty,
  });

  try {
    await newProduct.save();
    res.status(201).json({
      message: "User Created Succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const deleteProduct = await ProductModel.findOneAndDelete({
      _id: id,
    });
    res.status(201).json({
      message: `Succesfully delete ${id}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  const { id, name, qty } = req.body;

  try {
    const deleteProduct = await ProductModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        qty,
      }
    );
    res.status(201).json({
      message: "User edited Succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
};
