const Category = require("./category.model");
const catchAsync = require("../_utils/catchAsync");
const AppError = require("../_utils/appError");
const APIFeatures = require("../_utils/apiFeatures");

// get all Categories
exports.all = () =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const doc = await features.query.explain();
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs
    });
  });

// create Menu
exports.create = () =>
  catchAsync(async (req, res, next) => {
    // - get menu info
    const menu = await Menu.findById(req.params.menuId);

    // - create error if restaurant doesn't exist
    if (!menu)
      return next(
        new AppError("The menu was not found, or it has been deleted.", 404)
      );

    // - create new Category
    const createdCategory = await Category.create({
      name: req.body.name
    });

    res.status(200).json({
      status: "success",
      data: createdCategory
    });
  });

// update Category
exports.update = () =>
  catchAsync(async (req, res, next) => {
    let query = Category.findById(req.params.id);

    const Category = await query;

    if (!Category) {
      return next(new AppError("Category not found or has been deleted.", 404));
    }

    if (!canManageCategory(req.user, Category)) {
      return next(
        new AppError("You don't have permission to perform this action!", 401)
      );
    }

    // find and update
    const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError("Category not found or has been deleted.", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc
    });
  });

// get single Category
exports.getById = popOptions =>
  catchAsync(async (req, res, next) => {
    let query = Category.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const Category = await query;

    if (!Category) {
      return next(new AppError("No Category found", 404));
    }

    res.status(200).json({
      status: "success",
      data: Category
    });
  });

// delete Category
exports.delete = () =>
  catchAsync(async (req, res, next) => {
    // first find the resources
    let query = Category.findById(req.params.id);

    const Category = await query;

    if (!Category) {
      return next(new AppError("No Category info found", 404));
    }

    // create error if user has no permission
    if (!canManageCategory(req.user, Category))
      return next(
        new AppError("You don't permission to perform this action.", 401)
      );

    // find and delete
    const doc = await Category.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No Category info found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  });
