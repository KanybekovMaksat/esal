import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

export const CartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};
    if (cartData[product.id]) {
      setQuantity(cartData[product.id].quantity);
    }
  }, [product.id]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};

    if (quantity > 0) {
      cartData[product.id] = {
        ...product,
        quantity,
      };
    } else {
      delete cartData[product.id]; // Если 0, удаляем товар
    }

    localStorage.setItem('CARTStorage', JSON.stringify(cartData));
  }, [quantity, product]);

  return (
    <div>
      {quantity === 0 ? (
        <button
          className="px-4 py-1 border text-violet hover:bg-violet transition-all duration-300 hover:text-white border-violet rounded-lg flex items-center gap-2"
          onClick={() => setQuantity(1)}
        >
          <ShoppingCartIcon className="text-inherit" /> В корзину
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded border border-violet">
          <IconButton
            className="border border-milk p-1 rounded-lg"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
            aria-label="Уменьшить"
          >
            <IndeterminateCheckBoxRoundedIcon className="text-milk" />
          </IconButton>

          <span className="text-lg font-semibold text-violet">{quantity}</span>

          <IconButton
            className="p-1 rounded-lg"
            onClick={() => setQuantity((prev) => prev + 1)}
            aria-label="Добавить"
          >
            <AddBoxIcon className="text-milk" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
