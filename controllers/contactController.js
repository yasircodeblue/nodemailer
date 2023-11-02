const Contact = require('../models/Contact')

const postMessage = async (req, res) => {
    try {
        // Save data to the database
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });

        await newContact.save();
        return res.send({
            type: "success",
            message: "Message Sent Successfully",
        });
    } catch (err) {
        console.error('Error:', err);

        return res.status(500).send({
            type: "error",
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

const getMessages = async (req, res) => {
    try {
        // Fetch all messages from the database
        const messages = await Contact.find();

        return res.send({
            type: "success",
            messages: messages,
        });
    } catch (err) {
        console.error('Error:', err);

        return res.status(500).send({
            type: "error",
            message: "Internal Server Error",
            error: err.message,
        });
    }
};


module.exports = {
    postMessage,getMessages
};
