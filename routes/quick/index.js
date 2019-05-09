const User = require("../../database_models/user_model");

exports.register = function(plugin, options, next){
	plugin.route([
		{
			method: "GET",
			path: "/quick",
			config: {
				auth: "session",
				handler: function(request, reply){
					User.find({"email": {$ne: request.auth.credentials.user}}, function(err,users){
						reply.view("quick", {user_friends: users});
					});
				}
			}
		}

	]);



	next();
};

exports.register.attributes = {
	pkg: require("./package.json")
};