import React, {
  createContext,
  useContext,
  ReactElement,
  useState,
} from "react";
import { Order } from "../types/types";

interface IContext {
  order: Order[];
  setOrder?: any;
}

const initState: IContext = {
  order: [],
};
const OrderContext = createContext<IContext>(initState);
interface Props {
  children: ReactElement;
}

export const OrderProvider: React.FC<Props> = ({ children }) => {
  const [order, setOrder] = useState<Order[]>([]);
  const value = [order, setOrder];
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(`useOrder must be used within an OrderProvider`);
  }
  return context;
}
