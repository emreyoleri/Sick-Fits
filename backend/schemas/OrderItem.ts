import { rules } from "./../access";
import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";
import { isSignedIn } from "../access";

export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),

    photo: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: "Order.items" }),
  },
});
