const User = require("../../database_models/user_model");
const shortid = require("shortid");
const fs = require("fs");
const userStatus = require("../../database_models/user_status_model");



exports.register = function(plugin, options, next) {
	plugin.route([
	{
		method: "GET",
		path: "/user_profile",
		config: {
			auth: "session",
			handler: function(request,reply){
				User.findOne({"email": request.auth.credentials.user}, function(err,user){
					reply.view("user_profile",{user: user});
				});
			}
		}
	},
	{
		method: "POST",
		path: "/user_profile/edit",
		config: {
			auth: "session",
			handler: function(request,reply) {
				User.findOne({"email": request.auth.credentials.user}, function(err,user){
					user.name = request.payload.name;
					user.user_profile[0].aboutme = request.payload.aboutme;
					user.user_profile[0].course = request.payload.course;
					user.user_profile[0].interests = request.payload.interests;
					user.save(function(err){
						if(err){
							reply().code(400);
						} else {
							reply();
						}
					});
				});
				}
			}
		},
		{
			method: "POST",
			path: "/profile_pic/upload",
			config: {
				auth: "session",
				handler: function(request, reply){
					console.log("image_data", request.payload.image_data);
					let user_profile_image = "user_" + request.auth.credentials.member_id + "_" + shortid.generate() + "." + request.payload.image_type;
					fs.writeFile("user_profile_images/" + user_profile_image, new Buffer(request.payload.image_data,"base64"), function(err){
						if (!err){
							User.findOne({"email": request.auth.credentials.user}, function(err, user) {
								user.user_profile[0].profile_pic = user_profile_image;
								user.save(function(err) {
									if(err){
										reply(err)
									} else {
										userStatus.update({"user_email": request.auth.credentials.user}, {"profile_pic": user_profile_image}, function(err,result){
											reply(user_profile_image);
										});
									}
								})
							});
						}
					});
				}
			}
		},
		{
			method: "GET",
			path: 	"/user_profile/{member_id}",
			config: {
				auth: "session",
				handler: function(request,reply){
					User.find({"email": request.auth.credentials.user}, function(err,user){
						let all_user_friends = user[0].friends;
						let request_profile_member_id = request.params.member_id;
						all_user_friends.forEach(function(friend){
							if(friend.member_id === request_profile_member_id){
								User.findOne({"member_id": friend.member_id}, function(err,visiting_friend){
									reply.view("user_profile_visit", {user: visiting_friend});
								});
							}
							
						})
					});
				}
			}
		}
	])

	next();
}

exports.register.attributes = {
	pkg: require("./package.json")
}