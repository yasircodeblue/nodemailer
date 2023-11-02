const { model, Schema } = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
