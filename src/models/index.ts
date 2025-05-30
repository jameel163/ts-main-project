// models/index.ts
import { sequelize } from '../config/database';
import { UserDetails } from './user_details';
import { AddressDetails } from './user_address';
import { email } from './email';


const db = {
  sequelize,
  UserDetails,
  AddressDetails,
  email
};

// Run associations
UserDetails.associate(db);
AddressDetails.associate(db);
//console.log(db)
export default db;
