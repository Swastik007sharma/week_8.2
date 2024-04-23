const express = require("express");
const jwt = require("jsonwebtoken");
const {
	signUpUserSchema,
	userNameSchema,
	passwordSchema,
	updateSchema,
} = require("../zod/Schemas");
const { User } = require("../models/User");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
const { Account } = require("../models/Account")

router.post("/signup", async (req, res) => {
	const body = req.body;
	const { success } = signUpUserSchema.safeParse(body);
	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}

	const existingUser = await User.findOne({
		username: body.username,
	});

	if (existingUser) {
		return res.status(411).json({
			message: "Email Already Exists",
		});
	}

	const user = await User.create({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});

	const userId = user._id;

	await Account.create({
		UserId: userId,
		balance: 1 + Math.random() * 10000,
	});

	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET
	);

	res.json({
		token: token,
	});
});

router.post("/signin", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password
		const userSuccess = userNameSchema.safeParse(username);
		const passwordSuccess = passwordSchema.safeParse(password);
		if (!userSuccess.success || !passwordSuccess.success) {
			return res.status(411).json({
				message: "Incorrect inputs",
			});
		}

		const existingUser = await User.findOne({ username: userSuccess.data });
		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Verify password (you can use bcrypt or any other hashing library here)
		if (existingUser.password !== passwordSuccess.data) {
			return res.status(401).json({ message: "Incorrect password" });
		} else {
			const token = jwt.sign(
				{
					userId: User._id,
				},
				JWT_SECRET
			);

			res.status(200).json({
				token: token,
				message: "Sign-in successful",
			});
			return;
		}
	} catch (error) {
		res.status(400).json({ message: "Invalid input data",
	error : error});
	}
});

router.put("/", authMiddleware, async (req, res) => {
	const body = req.body;
	const { success } = updateSchema.safeParse(body);
	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}

	await User.updateOne(body, {
		id: req.userId,
	});

	res.json({
		message: "Update Successfully",
	});
});

router.get("/bulk", async (req, res) => {
	const filter = req.query.filter;
	const users = User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
					$option: "i",
				},
				lastName: {
					$regex: lastName,
					$option: "i",
				},
			},
		],
	});

	(await users).map((user) => ({
		username: user.userName,
		firstName: user.firstName,
		lastName: user.lastName,
		userId: user._id,
	}));
});

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId,
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
