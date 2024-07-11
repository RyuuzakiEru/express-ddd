import { DataSource } from "typeorm";

export const dataSource: DataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
    entities: ["src/**/*.entity.ts"]
});
