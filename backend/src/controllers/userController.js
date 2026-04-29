import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/data-source.js";

const userRepository = AppDataSource.getRepository("User");

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, username, email, password, avatar } = req.body;

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name?.trim()) user.name = name.trim();
    if (username?.trim()) user.username = username.trim();
    if (email?.trim()) user.email = email.trim();
    if (avatar !== undefined) user.avatar = avatar;

    if (password?.trim()) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userRepository.save(user);

    // remove password before sending
    delete updatedUser.password;

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
