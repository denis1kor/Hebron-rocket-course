const { authServices } = require('../services')
const Auth = require('../dataBase/Auth.model')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await authServices.comparePasswords(user.password, password);

      const tokenPair = authServices.generateTokenPair({ userId: user._id });

      await Auth.create({user_id: user._id, ...tokenPair});

      res.json({
        ...tokenPair,
        user
      });
    } catch (e) {
      next(e)
    }
  },

  logout: async (req, res, next) => {
    try {
      await Auth.deleteMany({ user_id: req.authUser._id });

      res.json('ok')
    } catch (e) {
      next(e);
    }
  },
};
