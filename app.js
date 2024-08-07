const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/qrcodes', express.static(path.join(__dirname, 'qrcodes')));

// Load routes
const bookRoutes = require('./routes/books');
const categoryRoutes = require('./routes/categorys');
const requestBookRoutes = require('./routes/request_books')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

app.use('/api/book', bookRoutes); // Register book routes under /api prefix
app.use('/api/category', categoryRoutes);
app.use('/api/requestBook', requestBookRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Terhubung ke API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
