const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SomeError = require('../errors/SomeError');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/config');
const { tokenEnum } = require('../constants');

async function comparePasswords(hashPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new SomeError('Wrong password', 400);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateTokenPair(encodeData = {}) {
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  return {
    access_token, 
    refresh_token 
  }
}

function validateToken(token, tokenType = tokenEnum.ACCESS) {
  try {
    let secretWord = ACCESS_TOKEN_SECRET;

    if (tokenType === tokenEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET
    }

    return jwt.verify(token, secretWord);
  } catch (e) {
    throw new SomeError(e.message || 'Invalid token', 401);
  }
}

module.exports = {
  comparePasswords,
  hashPassword,
  generateTokenPair,
  validateToken
}
