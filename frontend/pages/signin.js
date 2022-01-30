import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";
import { useUser } from "../components/User";
import RouterPush from "../components/RouterPush";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInPage = () => {
  const user = useUser();
  if (user) {
    return <RouterPush />;
  } else {
    return (
      <GridStyles>
        <SignIn />
        <SignUp />
        <RequestReset />
      </GridStyles>
    );
  }
};

export default SignInPage;
