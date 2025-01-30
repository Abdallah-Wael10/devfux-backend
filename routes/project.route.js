const express = require('express');
const {
  upload,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteExtraImage,
  updateExtraImage
} = require('../controllers/project.controller');
const verfiyToken = require('../middleware/verfiyToken');
const router = express.Router();

// Routes
router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 10 }
  ]),
 verfiyToken, createProject
);

router.get('/',verfiyToken, getAllProjects);
router.get('/:id', getProjectById);

router.patch(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 10 }
  ]),
  verfiyToken, updateProject
);

router.delete('/:id',verfiyToken, deleteProject);

// New routes for deleting and replacing images
router.delete('/:id/image',verfiyToken, deleteExtraImage); // Delete an extra image
router.patch('/:id/image', upload.single('newImage'),verfiyToken, updateExtraImage); // Replace an extra image

module.exports = router;
