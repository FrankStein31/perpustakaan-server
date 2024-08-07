const express = require('express');
const router = express.Router();
const multer = require('multer');
const BookControllers = require('../controller/books');

// Multer setup for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer setup for PDF uploads
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdfs/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'images/');
    } else if (file.fieldname === 'pdf_file') {
      cb(null, 'pdfs/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
}) });

// Endpoint for creating a book with image and pdf upload
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf_file', maxCount: 1 }]), async (req, res) => {
  const { title, author, publisher, publication_year, category_id, description_book } = req.body;
  const image = req.files['image'] ? `/images/${req.files['image'][0].filename}` : null;
  const pdf_file = req.files['pdf_file'] ? `/pdfs/${req.files['pdf_file'][0].filename}` : null;

  try {
    await BookControllers.create(title, author, publisher, publication_year, category_id, description_book, image, pdf_file);
    res.status(201).json({
      "status": 200,
      "message": "success"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

// Endpoint for updating a book with image and pdf upload
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf_file', maxCount: 1 }]), async (req, res) => {
  const id = req.params.id;
  const { title, author, publisher, publication_year, category_id, description_book } = req.body;
  const image = req.files['image'] ? `/images/${req.files['image'][0].filename}` : null;
  const pdf_file = req.files['pdf_file'] ? `/pdfs/${req.files['pdf_file'][0].filename}` : null;

  try {
    await BookControllers.update(id, title, author, publisher, publication_year, category_id, description_book, image, pdf_file);
    res.status(200).json({
      "status": 200,
      "message": "success"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

// Other endpoints...
router.get('/', async (req, res) => {
  try {
    const list = await BookControllers.list();
    res.status(200).json({
      "status": 200,
      "message": "success",
      "data": list
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

router.get('/category/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const {lat, long} = req.headers;
    const list = await BookControllers.listByCategory(id, lat, long);
    res.status(200).json({
      "status": 200,
      "message": "success",
      "data": list
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await BookControllers.detail(id);
    res.status(200).json({
      "status": 200,
      "message": "success",
      "data": detail
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await BookControllers.delete(id);
    res.status(200).json({
      "status": 200,
      "message": "success"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "status": 500,
      "message": error.message
    });
  }
});

module.exports = router;
