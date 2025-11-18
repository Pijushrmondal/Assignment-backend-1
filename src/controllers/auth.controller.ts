// /controllers/auth.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { loginSchema } from "../utils/validators/auth.validator";

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "INVALID_INPUT",
        details: parsed.error.errors,
      });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};
