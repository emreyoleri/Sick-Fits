import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permission } from "../access";
import { permissionFields } from "./fields";
export const Role = list({
  access: {
    create: permission.canManageRoles,
    read: permission.canManageRoles,
    update: permission.canManageRoles,
    delete: permission.canManageRoles,
  },
  ui: {
    hideCreate: (args) => !permission.canManageRoles(args),
    hideDelete: (args) => !permission.canManageRoles(args),
    isHidden: (args) => !permission.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});
