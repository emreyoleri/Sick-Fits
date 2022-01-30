import Head from "next/head";
import Link from "next/link";
import {
  OwnedProductsDivStyles,
  OwnedProductsSpanStyles,
} from "../pages/account";
import SignIn from "./SignIn";
import OrderStyles from "./styles/OrderStyles";
import { useUser } from "./User";

const Account = () => {
  const user = useUser();
  if (!user) return <SignIn />;

  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - My Account</title>
      </Head>

      <p>
        <span>Name:</span>
        <span>{user.name}</span>
      </p>

      <p>
        <span>Email:</span>
        <span>{user.email}</span>
      </p>

      <p>
        <span>Role:</span>
        <span>{user?.role ? user.role.name : "-"}</span>
      </p>

      {user?.products?.length !== 0 && (
        <div className="OrderStylesPTagLikeDivTag">
          <span>Owned Products:</span>
          <OwnedProductsSpanStyles>
            {user.products?.map((product) => (
              <OwnedProductsDivStyles key={product.id}>
                <img
                  src={product?.photo.image.publicUrlTransformed}
                  alt={product.name}
                  height="50"
                />
                <Link href={`/product/${product.id}`}>
                  {product.name.length > 10
                    ? `${product.name.slice(0, 10)}...`
                    : product.name}
                </Link>
              </OwnedProductsDivStyles>
            ))}
          </OwnedProductsSpanStyles>
        </div>
      )}
    </OrderStyles>
  );
};

export default Account;
