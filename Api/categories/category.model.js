const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const timestamp = require("../_plugins/timestamp");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "A Item must have a name!"],
    unique: true,
    trim: true
  },
  slug: {
    type: String
  }
});

categorySchema.plugin(timestamp);

categorySchema.index({
  slug: 1
});

// DOCUMENT MIDDLEWARE: runs before . save() and .create()
categorySchema.pre("save", function(next) {
  this.slug = slugify(this.name, {
    lower: true
  });
  next();
});

// QUERY MIDDLEWARE
categorySchema.pre(/^find/, function(next) {
  this.start = Date.now();
  next();
});

categorySchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} mill seconds!`);
  console.log(docs);
  next();
});

module.exports = mongoose.model("Category", categorySchema);
