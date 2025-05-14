import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const FoodPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Assuming you have a context for authentication

  const navigate = useNavigate();

  const handleAdd = async (foodId) => {
    try {
      if (!user || !user.id) {
        alert("Please login to add items to your cart.");
        return;
      }

      await api.post("/cart", { userId: user.id, foodId, quantity: 1 });

      alert("Added to cart");
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart", err);
      alert("Could not add to cart.");
    }
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await api.get(`/foods/${id}`);
        setFood(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load food");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={food.image}
          alt={food.name}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
          <p className="text-gray-700 mb-4">{food.description}</p>
          <p className="text-2xl font-semibold mb-4">{food.price} €</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleAdd(food._id)} // or food.id depending on backend
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
