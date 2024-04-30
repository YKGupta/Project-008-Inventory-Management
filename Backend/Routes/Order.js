const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authenticate = require('../Middlewares/AuthenthicateUser');
const checkAdmin = require('../Middlewares/AdminCheck');
const Order = require('../Models/Order');
const Item = require('../Models/Item');

const validators = [
    body('totalPrice', "Price must be numeric").isNumeric()
];

// Route 1 : Add new order using POST : /api/order/add
// Required authentication

router.post('/add', authenticate, [ ...validators ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Invalid inputs",
            success: false
        });
    }

    if(req.body.items.length <= 0)
    {
        return res.status(400).json({
            message: "No items were added",
            success: false
        });
    }

    try
    {

        const data = {
            userId: req.id,
            ...req.body
        };

        const order = new Order(data);

        await order.save();

        // Update items' quantites now
        const items = req.body.items;
        for(let i = 0; i < items.length; i++)
        {
            const item = await Item.findById(items[i].item);
            const updatedItem = {
                qty: item.qty - items[i].frequency
            };
            await Item.findByIdAndUpdate(items[i].item, { $set: updatedItem }, { new: true });
        }

        res.status(200).json({
            message: "Order created successfully!",
            order,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 2 : Get all orders using GET : /api/order/getall
// Required authentication + admin

router.get('/getall', authenticate, checkAdmin, async (req, res) => {

    try
    {
        const orders = await Order.find({});

        res.status(200).json({
            message: "Orders retrieved successfully!",
            orders,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 3 : Get all orders of a user using GET : /api/order/getall
// Required authentication

router.get('/getalluser', authenticate, async (req, res) => {

    try
    {
        const orders = await Order.find({ userId: req.id });

        res.status(200).json({
            message: "Orders retrieved successfully!",
            orders,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 4 : Update an order using PUT : /api/order/update
// Required authentication + admin

router.put('/update/:id', authenticate, checkAdmin, [ ...validators ], async (req, res) => {

    try
    {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if(!order)
        {
            return res.status(400).json({
                message: "Order not found",
                success: false
            });
        }

        const newOrder = {};
        if(status) newOrder.status = status;

        const updatedItem = await Order.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true });

        res.status(200).json({
            message: "Order updated successfully!",
            updatedItem,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 5 : Delete an order using DELETE : /api/order/delete
// Required authentication + admin

router.delete('/delete/:id', authenticate, checkAdmin, async (req, res) => {

    try
    {
        const order = await Order.findById(req.params.id);

        if(!order)
        {
            return res.status(400).json({
                message: "Order not found",
                success: false
            });
        }

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Order deleted successfully!",
            deletedOrder,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

module.exports = router;