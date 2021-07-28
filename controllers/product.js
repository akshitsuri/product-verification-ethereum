const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Add product to array of user
// @route     PUT /api/v1/product/add-product
// @access    Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.products.includes(req.body.product)) {
    return next(new ErrorResponse('Product already exists!', 400));
  }

  await user.products.push(req.body.product);
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      remove product from array of user
// @route     PUT /api/v1/product/remove-product
// @access    Private
exports.removeProduct = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.products = user.products.filter(
    (prod) => prod.toString() !== req.body.product.toString()
  );
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});
