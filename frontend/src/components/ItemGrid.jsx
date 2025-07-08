import React from "react";
import ItemCard from "./ItemCard";

const ItemGrid = ({ darkmode, items, onEdit, onDelete }) => {
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
          onEdit={onEdit ? () => onEdit(item) : null}
          onDelete={onDelete ? () => onDelete(item.id) : null}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
