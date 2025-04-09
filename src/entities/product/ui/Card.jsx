import React from 'react';
import { FavoriteButton } from '~features/product-card/favorite-button';
import { CartButton } from './../../../features/product-card/cart-button/cart-button.ui';

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="relative w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow md:w-64 h-70"
    >
      <img
        src={product.photo}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-md font-semibold text-[black]/80">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex items-start gap-[2px] font-semibold">
          {Math.floor(product.price)}
          <img src="/som.png" alt="currency" className="w-[20px] h-[20px]" />
        </p>
        <div className="mt-auto flex items-center justify-between">
          {/* <button className="px-4 py-1 bg-blue-600 border text-violet hover:bg-violet transition-all duration-300 hover:text-white border-violet rounded-lg flex items-center gap-2">
              <ShoppingCartIcon fontSize="small" className="text-inherit" />В корзину
            </button> */}
          <CartButton product={product} />
          <FavoriteButton id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
