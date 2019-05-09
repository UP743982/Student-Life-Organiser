const mongoose = require("mongoose");
const shortid = require("shortid");

let userProfileSchema = mongoose.Schema({
	aboutme:    {type: String, default: "None"},
	course: {type: String, default: "None"},
	interests:    {type: String, default: "None"},
	profile_pic: {type: String, default:"default_profile.png"}
})

let userSchema = mongoose.Schema({
	name: {type: String},
	email: {type: String},
	password: {type: String},
	member_id: {type: String, default: shortid.generate},
	friends: [{"member_id": String, "friend_name": String, "profile_pic": String}],
	friends_request: [{"member_id": String, "friend_name": String, "profile_pic": String}],
	user_profile: [userProfileSchema]
})

let user = mongoose.model("User", userSchema);

module.exports = user;



