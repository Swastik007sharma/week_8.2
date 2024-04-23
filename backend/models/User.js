const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minLength: 6,
		maxLength: 30,
		lowercase: true,
		trim: true,
	},
	firstName: {
		type: String,
		required: true,
		maxLength: 50,
		trim: true,
		uppercase: true,
	},
	lastName: {
		type: String,
		required: true,
		maxLength: 50,
		trim: true,
		uppercase: true,
	},
	password: {
		type: String,
		required: true,
		minLength:6,
		trim: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = {
	User,
};