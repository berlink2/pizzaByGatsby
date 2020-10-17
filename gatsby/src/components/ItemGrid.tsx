import React from "react";
import { PizzaI, PersonI, SanityData } from "../types/types";
import { ItemsGrid, ItemStyles } from "../styles/Grids";

interface Props {
  items: SanityData[];
}

const ItemGrid = ({ items }: Props) => {
  return (
    <ItemsGrid>
      {items.map((item) => {
        return (
          <ItemStyles key={item._id}>
            <p>
              <span className="mark">{item.name}</span>
            </p>
            <img
              width="500"
              height="400"
              alt={item.name}
              src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
              style={{
                background: `url(${item.image.asset.metadata.lqip})`,
                backgroundSize: "cover",
              }}
            />
          </ItemStyles>
        );
      })}
    </ItemsGrid>
  );
};

export default ItemGrid;
