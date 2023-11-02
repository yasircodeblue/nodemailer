const { model, Schema } = require('mongoose');

const jobSchema = new Schema({
    jobLocation: {
        type: String,
        required: true
    },
    jobTitle: {    
        type: String,
        required: true
    },
    jobDate: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
});

const Job = model('job', jobSchema);

module.exports = Job;
