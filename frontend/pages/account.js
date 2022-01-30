import styled from "styled-components";
import Account from "../components/Account";
import PleaseSignIn from "../components/PleaseSignIn";

export const OwnedProductsSpanStyles = styled.span`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const OwnedProductsDivStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 0.5rem;
`;

const AccountPage = () => {
  return (
    <PleaseSignIn>
      <Account />
    </PleaseSignIn>
  );
};

export default AccountPage;
