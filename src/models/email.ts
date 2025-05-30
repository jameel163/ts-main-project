'use strict';
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { EmailData, sendEmail } from '../interfaces/emailInterface';

type emailCreationAttributes = Optional<EmailData, "id">

export class email extends Model<EmailData, emailCreationAttributes> implements EmailData {
  id!: number;
  type!: string;
  subject!: string;
  html!: string;
}
email.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey:true,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  html: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'emails',
});
// type: DataTypes.STRING,
//   subject: DataTypes.STRING,
//   html: DataTypes.TEXT