const express = require("express");
const { Account } = require("../models/Account");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
	const account = await Account.findOne({
		userId: req.userId,
	});

	res.json({
		balance: account.balance,
	});
});

router.post("/transfer", authMiddleware, async (req, res) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		const { amount, to } = req.body;

		// Fetch the accounts within the transaction
		const account = await Account.findOne({ userId: req.userId }).session(
			session
		);

		if (!account || account.balance < amount) {
			return res.status(400).json({ error: "Insufficient balance." });
		}

		const recipientAccount = await Account.findOne({ userId: to }).session(
			session
		);

		if (!recipientAccount) {
			return res.status(400).json({ error: "Recipient not found." });
		}

		// Perform the transfer within the transaction
		account.balance -= amount;
		recipientAccount.balance += amount;

		await account.save({ session });
		await recipientAccount.save({ session });

		await session.commitTransaction();

		res.json({
			success: true,
			message: "Transfer successful.",
		});
	} catch (error) {
		// If an error occurs, abort the transaction and return an error response
		await session.abortTransaction();
		res
			.status(500)
			.json({ error: "An error occurred while processing the transfer." });
	} finally {
		session.endSession();
	}
});

module.exports = router;
