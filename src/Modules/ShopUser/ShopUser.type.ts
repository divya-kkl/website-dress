import { gql } from "apollo-server-express";

export const ShopUserType = gql`
  type ShopUser {
    id: ID!
    shopName: String!
    ownerName: String!
    email: String!
    contactNumber: String!
    address: String
    image: String
    createdAt: String
  }

  input RegisterShopUserInput {
    shopName: String!
    ownerName: String!
    email: String!
    password: String!
    contactNumber: String!
    image: String
    address: String
    gstNumber: String
  }

  input LoginShopUserInput {
    email: String!
    password: String!
  }

  input UpdateShopUserInput {
    shopName: String
    ownerName: String
    contactNumber: String
    address: String
    image: String
   
  }

  type ShopUserAuthResponse {
    user: ShopUser
    token: String
  }

  type ShopUserPaginated {
    users: [ShopUser]
    totalCount: Int
  }

  extend type Query {
    getAllShopUsers(search: String, page: Int, limit: Int): [ShopUser]
    getAllShopUsersPaginated(search: String, page: Int, limit: Int): ShopUserPaginated
    getShopUserById(id: ID!): ShopUser
    getShopUser(search: String, page: Int, limit: Int): [ShopUser]
  }

  extend type Mutation {
    registerShopUser(input: RegisterShopUserInput!): ShopUserAuthResponse!
    loginShopUser(input: LoginShopUserInput!): ShopUserAuthResponse!
    updateShopUser(id: ID!, input: UpdateShopUserInput!): ShopUser!
    deleteShopUser(id: ID!): String!
  }
`;
