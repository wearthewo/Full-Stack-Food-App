import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("price_asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await api.get("/foods", {
          params: {
            search: debouncedSearch,
            category,
            sort,
            page,
          },
        });
        setFoods(res.data.foods);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [debouncedSearch, category, sort, page]);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="meat">Meat</option>
          <option value="fish">Fish</option>
          <option value="soup">Soup</option>
          <option value="pasta">Pasta</option>
          <option value="salad">Salad</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
      </div>

      {/* food Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food) => (
            <Link
              to={`/food/${food._id}`}
              key={food._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={food.imageUrl || `/uploads/${food.image}`}
                alt={food.name}
                className="h-40 w-full object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{food.name}</h2>
              <p className="text-gray-500">{food.price} €</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
