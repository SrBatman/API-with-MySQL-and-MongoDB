const { Component } = require('../models/component');

// Create a new component
exports.createComponent = async (req, res) => {
    try {
        const component = new Component(req.body);
        await component.save();
        res.status(201).send(component);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.send(components);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Read a component by ID
exports.getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).send();
        }
        res.send(component);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a component by ID
exports.updateComponentById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'status']; // Add other fields as necessary
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).send();
        }

        updates.forEach((update) => component[update] = req.body[update]);
        await component.save();
        res.send(component);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a component by ID
exports.deleteComponentById = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).send();
        }
        res.send(component);
    } catch (error) {
        res.status(500).send(error);
    }
};