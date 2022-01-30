import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const LoadingStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingStyles>
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </LoadingStyles>
  );
};

export default Loading;
