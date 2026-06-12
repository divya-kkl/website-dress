import { gql } from "apollo-server-express";

export const CartType = gql`
  type CartItem {
    productId: String!
    productName: String!
    productImage: String!
    productMrp: Float!
    productDiscount: Float
    productSize: Float!
    productGender: String!
    productPrice: Float!
    productStock: Float!
    productCategory: String!
    quantity: Float!
    subtotal: Float!
  }

  type Cart {
    id: ID!
    userId: String!
    items: [CartItem]
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getAllCarts: [Cart]
    getCartByUserId(userId: ID!): Cart
  }

  extend type Mutation {
    addToCart(userId: ID!, productId: ID!, quantity: Float!): Cart!
    removeFromCart(userId: ID!, productId: ID!): Cart!
    clearCart(userId: ID!): String!
  }
`;
