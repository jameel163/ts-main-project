import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { AddressDetails } from './user_address'; // Import related model
import { UserAttributes } from '../interfaces/userInterfaces';

// Define class
type studentCreationAttributes = Optional<UserAttributes,  "id" | "user_profile">;
export class UserDetails extends Model<UserAttributes,studentCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone_no!: number;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public user_profile!: string;
  static associate(models: any) {
    // Change AddressAttributes to AddressDetails
    UserDetails.hasMany(models.AddressDetails, {
      foreignKey: 'user_id',
      as: 'addresses',
      onDelete: 'CASCADE',
    });
  }
}

// Initialize model
UserDetails.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_profile:{
      type:DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'user_details',
    sequelize,
    timestamps: true, // Enable if you're using createdAt/updatedAt
  }
);
