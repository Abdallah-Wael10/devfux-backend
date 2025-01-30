const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config()
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

 const url = process.env.MONGO_URL
mongoose.connect(url).then(()=>{
    console.log("Connected to MongoDB")
})
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve image files statically

 app.get('/', (req, res) =>{
  res.send('welcome to devfux')
 })
const packageRouter = require("./routes/package.route")
const contactusRouter = require("./routes/contactus.route")
const bookRouter = require("./routes/book.route")
const adminRouter = require("./routes/admin.route")
const projectRouter = require("./routes/project.route")
app.use("/api/package", packageRouter)
app.use("/api/contactus", contactusRouter)
app.use("/api/book", bookRouter)
app.use("/api/admin", adminRouter)
app.use("/api/project", projectRouter)
let totalVisitors = 0;

app.get('/api/visitors', (req, res) => {
    totalVisitors++;
    res.json({ totalVisitors });
  });

app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`Server is running on port 5000`)
})