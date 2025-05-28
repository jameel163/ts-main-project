import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { UserDetails } from './user_details';
import { AddressAttributes } from '../interfaces/userInterfaces';

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id'> {}

export class AddressDetails extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id!: number;
  public address!: string;
  public user_id!: number;

  static associate(models: any) {
    AddressDetails.belongsTo(models.UserDetails, {
      foreignKey: 'user_id',
      as: 'user_details', // Ensure the alias matches what you're querying with
      onDelete: 'CASCADE',
    });
  }
}

AddressDetails.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
          model: "user_details",
          key: "id",
        },
         onDelete: 'RESTRICT',
    },
  },
  {
    tableName: 'user_addresses',
    sequelize,
    timestamps: true, // Enable if you're using createdAt/updatedAt
  }
);
