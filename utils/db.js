const { MongoClient } = require('mongodb');

class DBClient {
  constructor () {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}:${database}`;
    this.client = new MongoClient(url);
  }

  async isAlive () {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return false;
    }
  }

  async nbUsers () {
    try {
      await this.client.connect();
      const db = this.client.db();
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('MongoDB error:', error);
      return -1;
    }
  }

  async nbFiles () {
    try {
      await this.client.connect();
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('MongoDB error:', error);
      return -1;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
