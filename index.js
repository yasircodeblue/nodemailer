// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactUsController = require('./controllers/contactController');
const connectDb = require('./config/db');
const {addJob,getjobs,viewJobs} = require('./controllers/JobController');
app.use(express.json());
app.use(cors());
const multer = require('multer');
const path = require('path');

connectDb();

app.get('/', (req, res) => {
    res.send('running');
});

const limiter = rateLimit({
    windowMs: 10 * 60 * 60 * 1000, // 10 hours
    max: 3, // limit each IP to 3 requests per windowMs
    message: 'Too many requests from this IP, please try again after 10 hours.',
});


// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
}); 

const upload = multer({ storage });


// routes ------------------------------------
app.post('/sendmail', limiter, contactUsController.postMessage);
app.get('/getmessage', contactUsController.getMessages);
app.post('/addjob',upload.single('jobImage'),addJob)
app.get('/getjobs',getjobs)
app.get('/viewjobs',viewJobs)

const port = 8000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
