const { Schema, model } = require('mongoose');

const userRolesEnum = require('../constants/user.roles');
const userGender = require('../constants/user.gender')

const User = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age: { type: Number, default: 18 },
    role: { type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER },
    gender: {type: String, enum: Object.values(userGender), default: userGender.NONE}
  },
  { timestamps: true }
);

module.exports = model('User', User);