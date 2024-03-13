const { countUsers, countFiles } = require('../utils');

const AppController = {
  getStatus: (req, res) => {
    const redisAlive = true;
    const dbAlive = true;

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await countUsers();
      const filesCount = await countFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = AppController;
