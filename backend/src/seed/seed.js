import "reflect-metadata";
import "dotenv/config";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { AppDataSource } from "../config/data-source.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/src/seed -> project root
const projectRoot = path.join(__dirname, "../../../");

// frontend public folder
const frontendPublicPath = path.join(projectRoot, "frontend/public");

const getBase64Image = (relativeImagePath) => {
  const fullPath = path.join(frontendPublicPath, relativeImagePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Image not found: ${fullPath}`);
    return null;
  }

  const ext = path.extname(fullPath).replace(".", "");
  const file = fs.readFileSync(fullPath);

  return `data:image/${ext};base64,${file.toString("base64")}`;
};

const usersData = [
  {
    id: 1,
    name: "Alice",
    username: "@alice",
    avatar: "img/man.png",
    password: "123456",
  },
  {
    id: 2,
    name: "Bob",
    username: "@bob",
    avatar: "img/hacker.png",
    password: "132456",
  },
  {
    id: 3,
    name: "Charlie",
    username: "@charlie",
    avatar: "img/boy.png",
    password: "123654",
  },
  {
    id: 4,
    name: "Diana",
    username: "@diana",
    avatar: "img/profile.png",
    password: "654321",
  },
  {
    id: 5,
    name: "Eve",
    username: "@eve",
    avatar: "img/panda.png",
    password: "654312",
  },
];

const postsData = [
  {
    id: 1,
    userId: 1,
    description:
      "Starting my day with a beautiful sunrise and a cup of coffee. ☀️☕ #morningvibes",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    shares: 9,
    likes: [2, 3],
  },
  {
    id: 2,
    userId: 2,
    description:
      "Just deployed my latest React application! 💻🚀 #coding #react",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    shares: 15,
    likes: [1, 3],
  },
  {
    id: 3,
    userId: 3,
    description:
      "Weekend adventure in the mountains! 🏔️ #hiking #nature #weekendvibes",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    shares: 22,
    likes: [1, 2, 4],
  },
  {
    id: 4,
    userId: 4,
    description:
      "Experimenting with street photography today. 📸 #photography #urban",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    shares: 28,
    likes: [1, 3],
  },
  {
    id: 5,
    userId: 5,
    description:
      "Spent the afternoon reading in my favorite bookstore café. 📚☕ #reading #books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    shares: 19,
    likes: [2, 3],
  },
];

const seed = async () => {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository("User");
    const postRepository = AppDataSource.getRepository("Post");
    const likeRepository = AppDataSource.getRepository("Like");
    const commentRepository = AppDataSource.getRepository("Comment");

    console.log("Seeding started...");

    // clear child tables first
    await AppDataSource.query(`
  TRUNCATE TABLE "likes", "comments", "posts", "users" RESTART IDENTITY CASCADE;
`);

    const users = [];

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = userRepository.create({
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: `${userData.username.replace("@", "")}@test.com`,
        password: hashedPassword,
        avatar: getBase64Image(userData.avatar),
      });

      await userRepository.save(user);
      users.push(user);
    }

    for (const postData of postsData) {
      const postUser = users.find((user) => user.id === postData.userId);

      const post = postRepository.create({
        id: postData.id,
        description: postData.description,
        image: postData.image,
        shares: postData.shares,
        user: postUser,
      });

      const savedPost = await postRepository.save(post);

      for (const likeUserId of postData.likes) {
        const likeUser = users.find((user) => user.id === likeUserId);

        const like = likeRepository.create({
          user: likeUser,
          post: savedPost,
        });

        await likeRepository.save(like);
      }
    }

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
