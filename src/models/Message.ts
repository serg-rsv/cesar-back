import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './User';

interface MessageAttributes {
  id: number;
  user_id: number;
  encrypted_message: Buffer;
  encryption_key: string;
  encryption_type: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public user_id!: number;
  public encrypted_message!: Buffer;
  public encryption_key!: string;
  public encryption_type!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    encrypted_message: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    encryption_key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    encryption_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true,
    underscored: true,
  }
);

export { Message };
// export const Message = sequelize.define(
//   'Message',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: User,
//         key: 'id',
//       },
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     encrypted_message: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     encryption_key: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     encryption_type: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     underscored: true,
//     modelName: 'Message',
//     tableName: 'messages',
//   }
// );
