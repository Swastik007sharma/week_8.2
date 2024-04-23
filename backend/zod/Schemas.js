const { z } = require("zod");

const userNameSchema = z
	.string({
		required_error: "This field is required",
		invalid_type_error: "Please enter a valid email",
	})
	.email()
const firstNameSchma = z
	.string()
	.min(3, { message: "atleast 3 or less than 60 character required" })
	.max(60, { message: "atleast 3 or less than 60 character required" })
const lastNameSchma = z
	.string()
	.min(3, { message: "atleast 3 or less than 60 character required" })
	.max(60, { message: "atleast 3 or less than 60 character required" });
const passwordSchema = z
	.string()
	.min(6, { message: "Atleast 6 character is required" });

	const signInUserSchema = z.object({
		username: z
			.string({
				required_error: "This field is required",
				invalid_type_error: "Please enter a valid email",
			})
			.email(),
		password: z.string().min(6, { message: "Atleast 6 character is required" }),
	});

const signUpUserSchema = z.object({
	username: z
		.string({
			required_error: "This field is required",
			invalid_type_error: "Please enter a valid email",
		})
		.email(),
	firstName: z
		.string()
		.min(3, { message: "atleast 3 or less than 60 character required" })
		.max(60, { message: "atleast 3 or less than 60 character required" }),
	lastName: z
		.string()
		.min(3, { message: "atleast 3 or less than 60 character required" })
		.max(60, { message: "atleast 3 or less than 60 character required" }),
	password: z.string().min(6, { message: "Atleast 6 character is required" }),
});

const updateSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: "atleast 3 or less than 60 character required" })
		.max(60, { message: "atleast 3 or less than 60 character required" }),
	lastName: z
		.string()
		.min(3, { message: "atleast 3 or less than 60 character required" })
		.max(60, { message: "atleast 3 or less than 60 character required" }),
	password: z.string().min(6, { message: "Atleast 6 character is required" }),
})
module.exports = ({
    userNameSchema,
    firstNameSchma,
    lastNameSchma,
    passwordSchema,
    signUpUserSchema,
	signInUserSchema,
	updateSchema
})