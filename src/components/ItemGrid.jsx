import React from "react";
import ItemCard from "./ItemCard";

const ItemGrid = ({darkmode, items}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <ItemCard
          key={index}
          status={item.status}
          title={item.title}
          description={item.description}
          location={item.location}
          date={item.date}
          image={item.image}
          darkmode={darkmode}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
