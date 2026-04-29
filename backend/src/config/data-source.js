import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Post } from "../entities/Post.js";
import { Comment } from "../entities/Comment.js";
import { Like } from "../entities/Like.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // set to false in production and use migrations
  logging: false,
  entities: [User, Post, Comment, Like],
});
