const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('MongoDB connection established!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})