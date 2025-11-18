import { Request, Response } from "express";
import { Screen } from "../models/Screen.model";

export const getScreens = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (search) {
      query.name = { $regex: search as string, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Screen.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Screen.countDocuments(query),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

export const toggleScreen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    screen.isActive = !screen.isActive;
    await screen.save();

    res.json({ message: "Updated", isActive: screen.isActive });
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};
