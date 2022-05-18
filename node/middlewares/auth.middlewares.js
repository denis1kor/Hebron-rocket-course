const { authServices } = require('../services')
const { authValidator } = require('../validators')
const AuthScheme = require('../dataBase/OAuth.model')
const SomeError = require('../error/SomeError')

async function checkAccessToken(req, res, next) {
  try {
    const access_token = req.get('Authorization');

    if (!access_token) {
      next(new SomeError('No token', 401));
      return;
    }

    authServices.validateToken(access_token);

    const tokenData = await AuthScheme.findOne({ access_token }).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      next(new SomeError('Not valid token', 401));
      return;
    }

    req.authUser = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
}

function checkRefreshToken(req, res, next) {
  try {
    const refresh_token = req.get('Authorization');

    if (!refresh_token) {
      next(new SomeError('No token', 401));
      return;
    }
    authServices.validateToken(refresh_token, 'refresh');

    next();
  } catch (e) {
    next(e);
  }
}

function isLoginDataValid(req, res, next) {
  try {
    const { value, error } = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new SomeError(error.details[0].message));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  isLoginDataValid
};
