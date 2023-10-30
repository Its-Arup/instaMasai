const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  blacklist: { type: [String] },
});

const BlacklistModel = mongoose.model("blcklist", blacklistSchema)

module.exports ={
    BlacklistModel
}
