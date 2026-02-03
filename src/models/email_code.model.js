import { DataTypes } from 'sequelize';
import db from '../db/connect.js';
import User from './user.model.js';

const EmailCode = db.define('email_code', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // userId as foreign key
});

EmailCode.belongsTo(User);
User.hasMany(EmailCode);

export default EmailCode;
