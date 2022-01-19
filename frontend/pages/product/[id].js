import SingleProduct from "../../components/SingleProduct";

const SignleProductPage = ({ query }) => {
  return <SingleProduct id={query.id} />;
};

export default SignleProductPage;
