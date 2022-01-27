import {
  OrderCreateInput,
  CartItemCreateInput,
} from "./../.keystone/schema-types";
import { KeystoneContext } from "@keystone-next/types";
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}
const graphql = String.raw;
const checkout = async (
  root: any,
  { token }: Arguments,
  context: KeystoneContext
) /* : Promise<OrderCreateInput> */ => {
  const userId = context.session.itemId;

  if (!userId)
    throw new Error("Sorry You must be signed in to create an order!");

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo{
            id
            image{
              id
              publicUrlTransformed
            }
          }
        }
      }
      `,
  });

  console.log(user);

  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) => {
      return tally + cartItem.quantity * cartItem.product?.price;
    },
    0
  );
  console.log(amount);
  // return amount

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
};

export default checkout;
