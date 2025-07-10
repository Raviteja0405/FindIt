import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchFilter from "../components/SearchFilter";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

const Home = ({ darkmode, setDarkmode }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/items?page=${pageNum}&limit=3`);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      // console.log(items);
      if (data.length === 0) {
        setHasMore(false); // No more items to load
      } else {
        setItems((prev) => {
          const combined = [...prev, ...data];
          const uniqueItems = Array.from(new Map(combined.map(item => [item._id, item])).values());
          return uniqueItems;
        });
        setPage(pageNum); // Update page after successful load
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(); // load first page
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchItems(page + 1);
    }
  };

  return (
    <div className={`${darkmode ? "bg-[#1a2330]" : "bg-gray-50"} min-h-screen transition-colors duration-300`}>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
      <div className="px-8 py-3 max-w-7xl mx-auto">
        <HeroSection
          darkmode={darkmode}
          title="FindIt: Campus Lost & Found Portal"
          subtitle="Reconnect with your lost items or help others find theirs"
          type="both"
        />
        <SearchFilter darkmode={darkmode} />

        {loading && items.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">Loading items...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : (
          <>
            <ItemGrid darkmode={darkmode} items={items} />
            {hasMore && (
              <div className="flex justify-center my-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={`bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-semibold transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Load More Items"}
                </button>
              </div>
            )}
            {!hasMore && (
              <p className="text-center text-gray-500 my-6">🎉 You've seen everything!</p>
            )}
          </>
        )}
      </div>
      <Footer darkmode={darkmode} />
    </div>
  );
};

export default Home;
