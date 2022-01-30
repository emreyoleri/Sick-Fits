import gql from "graphql-tag";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import { perPage } from "../config";
import { PAGINATION_QUERY } from "./Pagination";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signin();
    resetForm();

    const error =
      data?.authenticateUserWithPassword.__typename ===
      "UserAuthenticationWithPasswordFailure"
        ? data?.authenticateUserWithPassword
        : undefined;
    if (error) {
      Router.push({
        pathname: `/products`,
      });
    }
  };
  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={error} />
      <fieldset disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
