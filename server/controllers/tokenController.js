const { tokens } = require("../sequelize/models");
const sequelize = require("../sequelize/models/index").sequelize;

const checkAndDeleteExpiredTokens = async () => {
  try {
    await tokens.update(
      { expired: true },
      {
        where: {
          [sequelize.Sequelize.Op.and]: [
            { expiresAt: { [sequelize.Sequelize.Op.lt]: new Date() } },
            { expired: false },
          ],
        },
      }
    );
    console.log(`Updated token expiration`);
  } catch (error) {
    console.error("Error updating expired token", error);
  }
};

const handleCheckToken = async (req, res) => {
  const { token } = req.body;
  try {
    const tokenRecord = await tokens.findOne({ where: { token } });

    if (tokenRecord) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error("Error checking token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkAndDeleteExpiredTokens, handleCheckToken };
