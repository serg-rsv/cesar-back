import { Sequelize } from 'sequelize';

const { DB_URI } = process.env;

if (!DB_URI) {
  console.error('Database URI is not defined');
  process.exit(1);
}

const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log(
      '\x1b[34m%s\x1b[0m',
      `Connected to database ${sequelize.config.database} on ${sequelize.config.host}:${sequelize.config.port}`
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectToDatabase };
