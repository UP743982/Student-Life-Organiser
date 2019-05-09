const mongoose = require("mongoose");

let userStatusSchema = mongoose.Schema({
	user_email: String,
	user_status: String,
	name: String,
	profile_pic: String,
	status_date: {type: Date, default: Date.now}
});

let userStatus = mongoose.model("UserStatus", userStatusSchema);

module.exports = userStatus;