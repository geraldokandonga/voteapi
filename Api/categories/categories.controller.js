const Category = require("./category.model");
const Factory = require("../_utils/handlerFactory");

// EXPORTS
exports.getAllCategories = Factory.getAll(Category);
exports.getCategory = Factory.getOne(Category);
exports.createCategory = Factory.createOne(Category);
exports.updateCategory = Factory.updateOne(Category);
exports.deleteCategory = Factory.deleteOne(Category);
