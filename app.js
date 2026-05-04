const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');


const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');


const app = express();


const MONGODB_URI = 'mongodb://localhost:27017/bookmanager';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.set('views', './views');





app.use(passport.initialize());
app.use(passport.session());








app.use('/', authRoutes);
app.use('/', bookRoutes);


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/books');
  } else {
    res.redirect('/login');
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message || 'Something went wrong' });
});


app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure MongoDB is running on ${MONGODB_URI}`);
});
