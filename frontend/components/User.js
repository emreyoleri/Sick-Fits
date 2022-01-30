import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
        password_is_set
        role {
          id
          name
        }
        _ordersMeta {
          count
        }
        _productsMeta {
          count
        }
        products {
          name

          id
          photo {
            image {
              publicUrlTransformed
            }
          }
        }
      }
    }
  }
`;

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
};
