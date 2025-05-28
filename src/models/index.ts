// models/index.ts
import { sequelize } from '../config/database';
import { UserDetails } from './user_details';
import { AddressDetails } from './user_address';

const db = {
  sequelize,
  UserDetails,
  AddressDetails,
};

// Run associations
UserDetails.associate(db);
AddressDetails.associate(db);
//console.log(db)
export default db;
