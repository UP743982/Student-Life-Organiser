const User = require("../../database_models/user_model");



module.exports.register = function(server, options, next) {
	server.route([
	{
		method: "POST",
		path: "/sign_up",
		config: {
	    auth: false
	  },
		handler: function(request, reply) {
			User.findOne({"email": request.payload.email}, function(err, existing_user){
				if(existing_user) {
					reply("This eamail already registered").code(400);
				} else {
					let user = new User({"email": request.payload.email, "name": request.payload.name, "password": request.payload.password, "user_profile": {}});
					user.save(function(err, saved_user_record) {
						if(err) {
							reply("error signing up").code(400);
						} else {
							reply("Successfuly signed up");
						}
					});
				}
			});
		}
	},
	{
		method: "POST",
		path: "/login",
		config: {
	    auth: false
	  },
		handler: function(request, reply) {
			console.log("request_payload", request.payload);
			User.findOne({"email": request.payload.email, "password": request.payload.password}, function(err,valid_user){
				if(valid_user) {
					request.cookieAuth.set({"user": valid_user.email, "member_id": valid_user.member_id, "name": valid_user.name});
					reply();
				}
			})
		}
	},
	{
		method: "POST",
		path: "/logout",
		handler: function(request, reply) {
			request.cookieAuth.clear();
			reply();
		}}
  ]);

	next();
};

module.exports.register.attributes = {
	pkg: require("./package.json")
};
