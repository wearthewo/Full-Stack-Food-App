import Food from "../models/foodModel.js";

export const createFood = async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary URL
    const newFood = new Food(req.body);
    const savedFood = await newFood.save();
    return res.status(201).json(savedFood);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const getAllFoods = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // ✅ Map frontend sort values to MongoDB sorting fields
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;
      case "price_desc":
        sortOption.price = -1;
        break;
      case "name_asc":
        sortOption.name = 1;
        break;
      case "name_desc":
        sortOption.name = -1;
        break;
      default:
        sortOption.createdAt = -1; // fallback to newest
        break;
    }

    const foods = await Food.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Food.countDocuments(query);

    res.status(200).json({
      foods,
      page: Number(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    return res.json(food);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update
export const updateFood = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Food not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Food not found" });
    return res.json({ message: "Food deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
