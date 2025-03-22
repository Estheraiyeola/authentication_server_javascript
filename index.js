const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./main/config/database'); // Database configuration
const authRoutes = require('./main/controller/user_controller');

const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Use the authentication routes under '/auth'
app.use('/auth', authRoutes);

// Sync the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error syncing database:', err));
