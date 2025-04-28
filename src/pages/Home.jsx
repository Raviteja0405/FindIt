import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchFilter from "../components/SearchFilter";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

const Home = ({ darkmode, setDarkmode }) => {
  const items = [
    {
      id: 1,
      title: "MacBook Pro 13",
      status: "Lost",
      description: "Silver MacBook with stickers, lost at University Library.",
      location: "University Library",
      date: "2025-04-25",
      image: "https://media.wired.com/photos/65ea34d70264b0ad869cbc18/master/w_2560%2Cc_limit/MacBook-Air-M3-Review-Featured-Gear.jpg",
      user: "Alex Johnson",
    },
    {
      id: 2,
      title: "Hydroflask Water Bottle",
      status: "Found",
      description: "Found in Room 203, Science Building.",
      location: "Room 203, Science Building",
      date: "2025-04-26",
      image: "https://i.ebayimg.com/images/g/5aEAAOSwDChj4D~v/s-l1200.jpg",
      user: "Maya Patel",
    },
    {
      id: 3,
      title: "Student ID Card",
      status: "Found",
      description: "Found at Campus Center. Name partially visible.",
      location: "Campus Center",
      date: "2025-04-27",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6vbI6OQKd2oOkGvgBZlDcvxZ5fxVA236Uw&s",
      user: "Jordan Smith",
    },
    // Add more items as needed...
  ];
  
  return (
    <div
      className={`${
        darkmode ? "bg-[#1a2330]" : "bg-gray-50"
      } min-h-screen transition-colors duration-300`}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
      <div className="px-8 py-3 max-w-7xl mx-auto">
        <HeroSection darkmode={darkmode} title = "FindIt: Campus Lost & Found Portal" subtitle = "Reconnect with your lost items or help others find theirs" type="both"/>
        <SearchFilter darkmode={darkmode} />
        <ItemGrid darkmode={darkmode} items={items} />
        <div className="flex justify-center my-10">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-semibold transition">
            Load More Items
          </button>
        </div>
      </div>
      <Footer darkmode={darkmode} />
    </div>
  );
};

export default Home;
