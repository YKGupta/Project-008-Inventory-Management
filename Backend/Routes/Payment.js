const router = require('express').Router();
const Razorpay = require('razorpay');
const authenticate = require('../Middlewares/AuthenthicateUser');
const crypto = require("crypto");

router.post('/create', authenticate, async (req, res) => {
    try {
        const totalAmount = req.body.totalAmount;

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        const options = {
            amount: totalAmount * 100, // Amount in paise
            currency: 'INR',
            receipt: 'order_rcptid_11'
        };

        const order = await instance.orders.create(options);

        if (!order)
            res.status(400).json({
                message: "Order cannot be created",
                success: false
            });
        else {
            res.status(200).json({
                message: "Order created successfully!",
                order,
                success: true
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }
});

router.post('/verify', authenticate, async (req, res) => {
    try
    {
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        let hmac = crypto.createHmac('sha256', process.env.KEY_SECRET);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generated_signature = hmac.digest('hex');

        if(generated_signature !== razorpaySignature)
        {
            return res.status(400).json({
                message: "Illegal transaction",
                success: false
            });
        }

        res.status(200).json({
            message: "Payment successful",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            success: true
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
});

module.exports = router;