const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const jobsData = {
  "location": "Multan",
  "jobs": []
};

app.get('/jobs', (req, res) => {
  res.json(jobsData);
});
// ... (previous code)

app.post('/addJob', upload.single('jobImage'), (req, res) => {
    const { location, jobName, jobDate } = req.body;
    const image = req.file ? req.file.filename : null;
  
    if (!location || !jobName || !jobDate ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Update the default location in jobsData
    jobsData.location = location;
  
    const newJob = createJob(location, jobName, jobDate, image);
    jobsData.jobs.push(newJob);
    
    // Modify the response format
    res.json({
      "location": location,
      "job": [{
        "title": newJob.title,
        "date": newJob.date,
        "image": newJob.image
      }]
    });
  });
  
  // ... (previous code)
  

function createJob(location, title, date, image) {
  return {
    "id": Math.floor(Math.random() * 10000),
    "location": location,
    "title": title,
    "date": date,
    "image": image
  };
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
