import { rules } from "./../access";
import { list } from "@keystone-next/keystone/schema";
import { text, select, integer, relationship } from "@keystone-next/fields";
import { isSignedIn } from "../access";
export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"],
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }),
  },
});
