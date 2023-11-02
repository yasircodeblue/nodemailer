// controllers/addJobController.js
const Job = require('../models/Job'); // Assuming the model file is in the 'models' directory
const addJob = async (req, res) => {
    const { jobLocation, jobTitle, jobDate } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!jobLocation || !jobTitle || !jobDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new job using the Mongoose model
    const newJob = new Job({
        jobLocation,
        jobTitle,
        jobDate,
        image,
    });

    try {
        // Save the job to the database
        await newJob.save();

        // Modify the response format
        res.json({
            "location": jobLocation,
            "job": [{
                "title": newJob.jobTitle,
                "date": newJob.jobDate,
                "image": newJob.image
            }]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getjobs = async (req, res) => {
    try {
        // Fetch all jobs from the database
        const jobs = await Job.find();

        // Group jobs by city
        const jobsByCity = jobs.reduce((acc, job) => {
            const city = job.jobLocation;
            acc[city] = acc[city] || [];
            acc[city].push({
                title: job.jobTitle,
                date: job.jobDate,
                id: job._id, // assuming the MongoDB ObjectId is used as id
                image: job.image,
            });
            return acc;
        }, {});

        // Convert to the desired format
        const result = Object.entries(jobsByCity).map(([location, jobs]) => ({
            location,
            jobs,
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const viewJobs = async (req,res)=>{
    const jobs = await Job.find()
    console.log(jobs);
    res.status(201).json(jobs)
}

module.exports = {addJob,getjobs,viewJobs};
