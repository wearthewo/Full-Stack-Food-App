import { useEffect, useState } from "react";
import { api } from "../utils/api";

const AdminFoodsPage = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const { data } = await api.get("/foods/admin");
      setFoods(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post("/foods/admin", newFood);
      setNewFood({ name: "", price: "", description: "" });
      fetchFoods();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (foodId) => {
    try {
      const updatedName = prompt("Enter new name:");
      const updatedPrice = prompt("Enter new price:");
      const updatedDescription = prompt("Enter new description:");
      await api.put(`/foods/admin/${foodId}`, {
        name: updatedName,
        price: updatedPrice,
        description: updatedDescription,
      });
      fetchFoods();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`/foods/admin/${foodId}`);
      fetchFoods();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdateImage = async (foodId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const { data: uploadData } = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await api.put(`/foods/admin/${foodId}`, {
          image: uploadData.imageUrl,
        });

        fetchFoods();
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fileInput.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Foods</h1>

      {/* Create New Food */}
      <div className="border p-4 mb-6 rounded">
        <h2 className="text-xl font-bold mb-2">Create New Food</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={newFood.price}
            onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newFood.description}
            onChange={(e) =>
              setNewFood({ ...newFood, description: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Create Food
        </button>
      </div>

      {/* List of Foods */}
      {foods.map((food) => (
        <div key={food._id} className="border p-4 mb-4 rounded shadow-sm">
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
          <p>
            <b>Name:</b> {food.name}
          </p>
          <p>
            <b>Price:</b> €{food.price}
          </p>
          <p>
            <b>Description:</b> {food.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => handleUpdate(food._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleUpdateImage(food._id)}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Update Image
            </button>
            <button
              onClick={() => handleDelete(food._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminFoodsPage;
