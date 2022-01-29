import { rules, permission } from "./../access";
import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";
export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    delete: permission.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permission.canManageUsers(args),
    hideDelete: (args) => !permission.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    role: relationship({
      ref: "Role.assignedTo",
      access: {
        create: permission.canManageUsers,
        update: permission.canManageUsers,
      },
    }),
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
  },
});
