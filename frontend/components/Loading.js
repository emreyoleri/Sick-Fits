import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const LoadingStyles = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingStyles>
      <BallTriangle color="#00BFFF" height={80} width={80} />
      <h3>Loading ...</h3>
    </LoadingStyles>
  );
};

export default Loading;
