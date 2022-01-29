import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data?.role?.[permission];
    },
  ])
);

export const permission = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs) {
    return session?.data.name.includes("Emre");
  },
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (permission.canManageProducts({ session })) return true;
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permission.canManageProducts({ session })) return true;
    return { status: "AVAILABLE" };
  },
};
