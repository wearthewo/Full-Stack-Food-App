// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db/configDB.js";
import Food from "../models/foodModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

// Example: Cloudinary image URLs
const foods = [
  {
    name: "Steak",
    category: "meat",
    price: 19.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713813/food_12_boog6h.jpg",
    description: "Juicy grilled steak with herbs.",
  },
  {
    name: "Spaghetti",
    category: "pasta",
    price: 12.5,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713808/food_11_eyelil.jpg",
    description: "Classic spaghetti with marinara sauce.",
  },
  {
    name: "Bolognaise",
    category: "pasta",
    price: 10.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713793/food_10_zo64hv.jpg",
    description: "Juicy grilled steak with herbs.",
  },
  {
    name: "Steak",
    category: "meat",
    price: 17.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713783/food_9_rexu4g.jpg",
    description: "Succulent steak with garlic butter.",
  },
  {
    name: "Double Chicken Burger",
    category: "burger",
    price: 9.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713774/food_8_rz9yhp.jpg",
    description: "Juicy double chicken patty with lettuce and tomato.",
  },
  {
    name: "Beef Burger with caramelized onions",
    category: "burger",
    price: 10.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713765/food_7_osllmx.jpg",
    description: "Beefy burger with caramelized onions.",
  },
  {
    name: "Beef Burger with cheddar cheese",
    category: "burger",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713756/food_6_waois7.jpg",
    description: "Juicy beef burger with cheddar cheese.",
  },
  {
    name: "Fish Soup",
    category: "soup",
    price: 20.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713745/food_5_rol0sx.jpg",
    description: "Delicious fish soup with fresh herbs.",
  },
  {
    name: "Salad",
    category: "salad",
    price: 7.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713732/food_4_sq4ei9.jpg",
    description: "Fresh garden salad with vinaigrette.",
  },
  {
    name: "Lasagna",
    category: "pasta",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713714/food_3_obqqii.jpg",
    description: "Classic lasagna with tomato sauce and pesto.",
  },
  {
    name: "Salmon with lemon sauce",
    category: "fish",
    price: 25.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713697/food_2_ak90bs.jpg",
    description: "Grilled salmon with lemon sauce.",
  },
  {
    name: "Greek Souvlaki",
    category: "meat",
    price: 13.99,
    imageUrl:
      "https://res.cloudinary.com/dxhmw57vz/image/upload/v1746713222/food_1_t4tg5t.jpg",
    description: "Grilled pork souvlaki with tzatziki sauce.",
  },
];

const importData = async () => {
  try {
    await Food.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        username: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10), // or plain if you use pre-save hashing
        role: "admin",
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleFoods = foods.map((food) => ({
      ...food,
      user: adminUser,
    }));

    await Food.insertMany(sampleFoods);

    console.log("Food Data Imported!");
    process.exit();
  } catch (error) {
    console.error(" Error importing:", error);
    process.exit(1);
  }
};

importData();
