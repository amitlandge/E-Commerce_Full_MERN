const Order = require("../model/orderShema");
const Product = require("../model/productSchema");
const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });
    res.status(200).json({
      message: "Success",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) {
      throw new Error("Order Does Not Exist");
    }
    res.status(200).json({
      message: "Success",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      throw new Error("Order Does Not Exist");
    }

    res.status(200).json({
      message: "Success",
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  res.status(200).json({
    message: "Success",
    orders,
    totalAmount,
  });
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order Does Not Exist");
    }
    if (order.orderStatus === "Delivered") {
      throw new Error("You have already delivered this order");
    }
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (order) => {
        await updateStock(order._id, order.quantity);
      });
    }
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  console.log(product);
  product.stock -= quantity;
  console.log(product);

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    throw new Error("Order Does Not Exist");
  }

  res.status(200).json({
    success: true,
  });
};
exports.createOrder = createOrder;
exports.getSingleOrder = getSingleOrder;
exports.myOrders = myOrders;
exports.getAllOrders = getAllOrders;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
