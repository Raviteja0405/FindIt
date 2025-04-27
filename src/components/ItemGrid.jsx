import React from "react";
import ItemCard from "./ItemCard";

const ItemGrid = ({darkmode}) => {
  // Static Data for now (replace with API data later)
  const items = [
    {
      status: "Lost",
      title: "MacBook Pro 13",
      description: "Silver MacBook with stickers, lost at University Library.",
      user: "Alex Johnson",
      image: "https://media.wired.com/photos/65ea34d70264b0ad869cbc18/master/w_2560%2Cc_limit/MacBook-Air-M3-Review-Featured-Gear.jpg"
    },
    {
      status: "Found",
      title: "Hydroflask Water Bottle",
      description: "Found in Room 203, Science Building.",
      user: "Maya Patel",
      image: "https://i.ebayimg.com/images/g/5aEAAOSwDChj4D~v/s-l1200.jpg"
    },
    {
      status: "Found",
      title: "Student ID Card",
      description: "Found at Campus Center. Name partially visible.",
      user: "Jordan Smith",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6vbI6OQKd2oOkGvgBZlDcvxZ5fxVA236Uw&s"
    },
    // Add more items...
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <ItemCard
          key={index}
          status={item.status}
          title={item.title}
          description={item.description}
          user={item.user}
          image={item.image}
          darkmode={darkmode}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
