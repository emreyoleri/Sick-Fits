import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h2,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        src={cartItem.product.photo.image.publicUrlTransformed}
        width="100"
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};

export default CartItem;
