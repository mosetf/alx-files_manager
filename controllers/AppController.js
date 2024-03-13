const { countUsers, countFiles } = require('../utils');

const AppController = {
  getStatus: (req, res) => {
    const redisAlive = true; // Replace with your Redis check logic
    const dbAlive = true; // Replace with your DB check logic

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await countUsers(); // Replace with your logic to count users
      const filesCount = await countFiles(); // Replace with your logic to count files

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = AppController;
