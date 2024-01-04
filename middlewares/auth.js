const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/user");
const { userModel } = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    const data = jwt.verify(
      token,
      "RpXvOrMaOxRDkI1fSz8kuqHQksYaE/viQNyShxzaqMO7nKBFoyf2hnNOTQDt1Q6DWXiAKaH+BgeU/qc44TuuCg=="
    );

    // console.log(data);

    if (data.role === "authenticated") {
      const { avatar_url, email, name } = data.user_metadata;

      let user = await getUserByEmail(data.user_metadata?.email);

      if (!user) {
        user = await userModel.create({
          avatarUrl: avatar_url,
          displayName: name,
          email,
          provider: data.app_metadata.provider,
        });
      }

      req.user = user;

      next();
    } else {
      res.status(401).json({
        error: "AUTHENTICATED_FAILED",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "AUTHENTICATED_FAILED",
    });
  }
};

module.exports = { authMiddleware };
