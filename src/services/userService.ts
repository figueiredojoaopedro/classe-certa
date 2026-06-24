import bcrypt from "bcryptjs";
import { userRepository } from "@/src/repositories/userRepository";
import type { User, RegisterInput } from "@/src/types";

function serialize(user: {
  username: string;
  email: string;
  profileImageUrl: string | null;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}): User {
  return {
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export const userService = {
  async register(input: RegisterInput): Promise<User> {
    const existingUsername = await userRepository.findByUsername(input.username);
    if (existingUsername) {
      throw new Error("Username already taken");
    }

    const existingEmail = await userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await userRepository.create({
      username: input.username,
      email: input.email,
      password: hashedPassword,
      phoneNumber: input.phoneNumber ?? null,
    });

    return serialize(user);
  },

  async login(
    identifier: string,
    password: string,
  ): Promise<User> {
    const user = await userRepository.findByUsernameOrEmail(identifier);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return serialize(user);
  },

  async getUser(username: string): Promise<User | null> {
    const user = await userRepository.findByUsername(username);
    return user ? serialize(user) : null;
  },
};
