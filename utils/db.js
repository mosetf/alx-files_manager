const { MongoClient } = require('mongodb');

class DBClient {
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = null;
    this.isConnected = false;
  }

  async connect () {
    const url = `mongodb://${this.host}:${this.port}/${this.database}`;
    try {
      this.client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      this.isConnected = true;
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
      this.isConnected = false;
    }
  }

  isAlive () {
    return this.isConnected;
  }

  async nbUsers () {
    if (!this.isConnected) {
      throw new Error('Not connected to MongoDB');
    }
    const db = this.client.db(this.database);
    const collection = db.collection('users');
    const count = await collection.countDocuments({});
    return count;
  }

  async nbFiles () {
    if (!this.isConnected) {
      throw new Error('Not connected to MongoDB');
    }
    const db = this.client.db(this.database);
    const collection = db.collection('files');
    const count = await collection.countDocuments({});
    return count;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
