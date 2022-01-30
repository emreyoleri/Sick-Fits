import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import { perPage } from "../config";
import { ALL_PRODUCTS_QUERY } from "./Products";
import { PAGINATION_QUERY } from "./Pagination";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [
      { query: CURRENT_USER_QUERY },
      {
        query: ALL_PRODUCTS_QUERY,
        variables: {
          skip: 0,
          first: perPage,
        },
      },
      {
        query: PAGINATION_QUERY,
      },
    ],
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
};

export default SignOut;
