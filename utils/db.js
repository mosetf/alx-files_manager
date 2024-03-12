import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Class that creates a new DBClient instance.
   */
  constructor () {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Function that checks if this client's connection
   * To the MongoDB server is active.
   */
  isAlive () {
    return this.client.isConnected();
  }

  /**
   * Function that retrieves the number of users in the database.
   */
  async nbUsers () {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Function that retrieves the number of files in the database.
   */
  async nbFiles () {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Function that retrieves a reference to the `users` collection.
   */
  async usersCollection () {
    return this.client.db().collection('users');
  }

  /**
   * Function that retrieves a reference to the `files` collection.
   */
  async filesCollection () {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
