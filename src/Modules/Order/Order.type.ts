import { gql } from "apollo-server-express";

export const OrderType = gql`
  type OrderItem {
    productId: ID!
    quantity: Int!
    price: Float!
    mrp: Float!
    name: String!
    image: String!
    size: String!
  }

  type Order {
    id: ID!
    userId: ID!
    shopId: ID!
    orderItems: [OrderItem]!
    orderNumber: String!
    subTotal: Float!
    createdAt: String
    updatedAt: String
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
    price: Float!
    mrp: Float!
    name: String!
    image: String!
    size: String!
  }

  input CreateOrderInput {
    userId: ID!
    shopId: ID!
    orderItems: [OrderItemInput]!
    orderNumber: String!
    subTotal: Float!
  }

  type Query {
    getAllOrders: [Order]
    getOrderById(id: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput): Order!
    deleteOrder(id: ID!): String!
  }
`;
