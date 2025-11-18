import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { User } from "../models/User.model";
import { Screen } from "../models/Screen.model";
import { Playlist } from "../models/Playlist.model";

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Screen.deleteMany({});
    await Playlist.deleteMany({});

    // Create seeded admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    // Create seeded editor user
    const editorPassword = await bcrypt.hash("editor123", 10);
    const editorUser = await User.create({
      email: "editor@example.com",
      password: editorPassword,
      role: "EDITOR",
    });

    // Create some screens
    const screens = await Screen.insertMany([
      { name: "Main Display Screen", isActive: true },
      { name: "Lobby Screen", isActive: true },
      { name: "Conference Room Screen", isActive: false },
      { name: "Reception Screen", isActive: true },
      { name: "Waiting Area Screen", isActive: false },
    ]);

    // Create some playlists
    const playlists = await Playlist.insertMany([
      {
        name: "Welcome Playlist",
        itemUrls: [
          "https://example.com/video1.mp4",
          "https://example.com/image1.jpg",
        ],
        itemCount: 2,
      },
      {
        name: "Marketing Playlist",
        itemUrls: [
          "https://example.com/video2.mp4",
          "https://example.com/image2.jpg",
          "https://example.com/video3.mp4",
        ],
        itemCount: 3,
      },
      {
        name: "Empty Playlist",
        itemUrls: [],
        itemCount: 0,
      },
    ]);

    console.log("✅ Seed completed successfully!");
    console.log(`   - Created ${2} users (admin@example.com, editor@example.com)`);
    console.log(`   - Created ${screens.length} screens`);
    console.log(`   - Created ${playlists.length} playlists`);
    console.log("\n📝 Login credentials:");
    console.log("   Admin: admin@example.com / admin123");
    console.log("   Editor: editor@example.com / editor123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seed();
