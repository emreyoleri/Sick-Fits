import React from "react";
import styled from "styled-components";

export const SuccessMessageStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid green;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const SuccessMessage = ({ text, children }) => {
  return (
    <SuccessMessageStyles>
      <p>
        {text && <strong>{text}</strong>}
        {children}
      </p>
    </SuccessMessageStyles>
  );
};

export default SuccessMessage;
