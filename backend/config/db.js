const mongoose = require('mongoose');

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/Chat-App', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
    console.log('Connected to MongoDB Failure');
    console.log(`Error: ${error}`);
  }
}

module.exports = { connect };
