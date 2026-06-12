import { gql } from "apollo-server-express";

export const ShopUserType = gql`
  type ShopUser {
    id: ID!
    shopName: String!
    ownerName: String!
    email: String!
    contactNumber: String!
    address: String
  
    createdAt: String
  }

  input RegisterShopUserInput {
    shopName: String!
    ownerName: String!
    email: String!
    password: String!
    contactNumber: String!
   
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
   
  }

  type ShopUserAuthResponse {
    user: ShopUser
    token: String
  }

  extend type Query {
    getAllShopUsers: [ShopUser]
    getShopUserById(id: ID!): ShopUser
  }

  extend type Mutation {
    registerShopUser(input: RegisterShopUserInput!): ShopUserAuthResponse!
    loginShopUser(input: LoginShopUserInput!): ShopUserAuthResponse!
    updateShopUser(id: ID!, input: UpdateShopUserInput!): ShopUser!
    deleteShopUser(id: ID!): String!
  }
`;
