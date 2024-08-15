const AuthToken = require("../models/authToken");
const { google } = require("googleapis");
const UserModel = require("../models/user");

const getUsers = async (req, res) => {
  const { p, q } = req.query;
  try {
    let user;
    if (q) {
      user = await UserModel.find({
        name: { $regex: new RegExp(q, "i") },
      }).sort({ _id: -1 });
    } else {
      user = await UserModel.find().sort({ _id: -1 });
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

const createUser = async (req, res) => {
  const { name, permission } = req.body;

  const newProduct = new UserModel({
    name,
    permission,
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

const updateUser = async (req, res) => {
  const { id, name, permission } = req.body;

  try {
    await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        permission,
      }
    );
    res.status(202).json({ message: `id with ${id} succesfully update` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const softDeleteUser = async (req, res) => {
  const { id } = req.query;
  const checkActive = await UserModel.find({
    _id: id,
  });
  if (!checkActive[0].isActive)
    return res.status(400).json({ message: "produt is not found" });

  try {
    const product = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        isActive: false,
      }
    );
    if (!product) return res.status(404).json({ message: "product not found" });
    res.status(201).json({ message: `deleted product with id : ${id}` });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  softDeleteUser,
  updateUser,
};
