import { DataTypes } from 'sequelize';
import db from '../db/connect.js';

const User = db.define(
  'user',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,      
    },    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },    
);

User.prototype.toJSON = function () {
    const values = {...this.get() };
    delete values.password;
    return values;
  } ;

export default User;
