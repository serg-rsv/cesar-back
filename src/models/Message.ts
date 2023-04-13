import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './User';

interface MessageAttributes {
  id: number;
  user_id: number;
  encrypted_text: Buffer;
  encryption_key: string;
  encryption_type: 'cesar' | 'xor';
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public user_id!: number;
  public encrypted_text!: Buffer;
  public encryption_key!: string;
  public encryption_type!: 'cesar' | 'xor';
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
    encrypted_text: {
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
        isIn: [['cesar', 'xor']],
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
