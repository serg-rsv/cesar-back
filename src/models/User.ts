// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config';

// export const User = sequelize.define(
//   'User',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     passwordHash: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     token: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     lastLogin: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true,
//     underscored: true,
//     modelName: 'User',
//     tableName: 'users',
//   }
// );

import { Model, Optional, DataTypes } from 'sequelize';
import { compare } from 'bcryptjs';
import { sequelize } from '../config';

interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  token: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public token!: string | null;

  async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export { User };
