import { Request, Response } from "express";
import { Playlist } from "../models/Playlist.model";

export const getPlaylists = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search ? String(req.query.search) : "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = search ? { name: { $regex: search, $options: "i" } } : {};

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Playlist.find(filter)
        .select("_id name itemCount")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Playlist.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, itemUrls = [] } = req.body;

    const playlist = await Playlist.create({
      name,
      itemUrls,
      itemCount: itemUrls.length,
    });

    res.status(201).json({
      _id: playlist._id,
      name: playlist.name,
      itemCount: playlist.itemCount,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Playlist name already exists" });
      return;
    }
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};
