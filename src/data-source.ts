import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSourceConfig = {
  type: "mysql" as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/entities/**/*.js"],
  synchronize: true,
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
  logging: true,
  migrations: ["./dist/migration/*.js"],
};

const AppDataSource = new DataSource(AppDataSourceConfig);

export default AppDataSource;
