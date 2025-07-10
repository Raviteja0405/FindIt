import React from "react";
import ItemCard from "./ItemCard";

const ItemGrid = ({ darkmode, items, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {items.map((item, index) => {
        const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <ItemCard
            key={index}
            type={item.type}
            title={item.title}
            description={item.description}
            location={item.location}
            date={formattedDate}
            category={item.category}
            image={item.imageUrl}
            darkmode={darkmode}
            onEdit={onEdit ? () => onEdit(item) : null}
            onDelete={onDelete ? () => onDelete(item.id) : null}
          />
        );
      })}
    </div>
  );
};

export default ItemGrid;
