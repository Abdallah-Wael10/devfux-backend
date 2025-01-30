const Project = require('../models/project.model');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use unique names
  },
});
const upload = multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed!'), false);
    },
  });
  
// POST: Create a new project
const createProject = async (req, res) => {
  try {
    const { title, status } = req.body;
    const mainImage = req.files.mainImage[0].path;
    const extraImages = req.files.extraImages ? req.files.extraImages.map(file => file.path) : [];

    const project = new Project({ title, status, mainImage, extraImages });
    await project.save();
    res.status(201).json({ message: 'Project created successfully!', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

// PATCH: Update a project by ID
// PATCH: Update a project by ID
const updateProject = async (req, res) => {
  try {
    const { title, status } = req.body;

    const updates = {};
    if (title) updates.title = title;
    if (status) updates.status = status;
    if (req.files.mainImage) updates.mainImage = req.files.mainImage[0].path;

    // Handle new extra images (append them)
    if (req.files.extraImages) {
      const newExtraImages = req.files.extraImages.map((file) => file.path);
      updates.$push = { extraImages: { $each: newExtraImages } };
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    res.status(200).json({ message: "Project updated successfully!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }
    res.status(200).json({ message: 'Project deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Delete a specific image from extraImages
const deleteExtraImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagePath } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    const imageIndex = project.extraImages.indexOf(imagePath);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in extraImages!' });
    }

    project.extraImages.splice(imageIndex, 1);

    const filePath = path.join(__dirname, '..', imagePath);
    fs.unlinkSync(filePath);

    await project.save();
    res.status(200).json({ message: 'Image deleted successfully!', updatedProject: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH: Replace a specific image in extraImages
const updateExtraImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldImagePath } = req.body;
    const newImage = req.file;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }

    const imageIndex = project.extraImages.indexOf(oldImagePath);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Old image not found in extraImages!' });
    }

    const newImagePath = `uploads/${newImage.filename}`;
    project.extraImages[imageIndex] = newImagePath;

    const oldFilePath = path.join(__dirname, '..', oldImagePath);
    fs.unlinkSync(oldFilePath);

    await project.save();
    res.status(200).json({ message: 'Image replaced successfully!', updatedProject: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteExtraImage,
  updateExtraImage,
};
 