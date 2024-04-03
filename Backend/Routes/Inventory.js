const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authenticate = require('../Middlewares/AuthenthicateUser');
const Item = require('../Models/Item');

const validators = [
    body('name', "Name cannot be empty").isLength({ min: 1 }),
    body('qty', "Quantity must be numeric").isNumeric()
];

// Route 1 : Add new item using POST : /api/inventory/add
// Required authentication

router.post('/add', authenticate, [ ...validators ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Invalid inputs"
        });
    }

    try
    {
        const { name, qty } = req.body;

        // Check if item already exists
        const oldItem = await Item.findOne({ name });
        if(oldItem)
        {
            return res.status(400).json({
                message: "Item already exists"
            });
        }

        const item = new Item({
            name,
            qty,
            user: req.id
        });

        await item.save();

        res.status(200).json({
            message: "Item created successfully!",
            item
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }

});

// Route 2 : Get all items of a user using GET : /api/inventory/getall
// Required authentication

router.get('/getall', authenticate, async (req, res) => {

    try
    {
        const items = await Item.find({ user: req.id });

        res.status(200).json({
            message: "Item created successfully!",
            items
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }

});

// Route 3 : Update an item using PUT : /api/inventory/update
// Required authentication

router.put('/update/:id', authenticate, [ ...validators ], async (req, res) => {

    try
    {
        const { name, qty } = req.body;
        const item = await Item.findById(req.params.id);

        if(!item)
        {
            return res.status(400).json({
                message: "Item not found"
            });
        }

        if(item.user.toString() !== req.id)
        {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }

        const newItem = {};
        if(name) newItem.name = name;
        if(qty) newItem.qty = qty;

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true });

        res.status(200).json({
            message: "Item updated successfully!",
            updatedItem
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }

});

// Route 4 : Delete an item using DELETE : /api/inventory/delete
// Required authentication

router.delete('/delete/:id', authenticate, async (req, res) => {

    try
    {
        const item = await Item.findById(req.params.id);

        if(!item)
        {
            return res.status(400).json({
                message: "Item not found"
            });
        }

        if(item.user.toString() !== req.id)
        {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }

        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Item deleted successfully!",
            deletedItem
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }

});

module.exports = router;