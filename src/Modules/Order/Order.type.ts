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

  type DeliveryAddress {
    addressType: String!
    name: String!
    street: String!
    city: String!
    state: String!
    country: String!
    zipCode: String!
    phone: String!
  }

  type DeliveryPartner {
    name: String!
    trackingId: String!
    contactNumber: String!
  }

  type Order {
    id: ID!
    userId: ID!
    shopDetails: ShopUser
    orderNumber: String!
    items: [OrderItem!]!
    subTotal: Float!
    deliveryCharge: Float!
    totalAmount: Float!
    status: String!
    paymentStatus: String!
    paymentMethod: String!
    deliveryAddress: DeliveryAddress!
    notes: String
    image: String
    couponCode: String
    isCouponApplied: Boolean!
    deliveryPartner: DeliveryPartner
    createdAt: String!
    updatedAt: String!
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

  input DeliveryAddressInput {
    addressType: String!
    name: String!
    street: String!
    city: String!
    state: String!
    country: String!
    zipCode: String!
    phone: String!
  }

  input DeliveryPartnerInput {
    name: String!
    trackingId: String!
    contactNumber: String!
  }

  input PlaceOrderInput {
    userId: ID!
    shopDetails: ID
    orderNumber: String!
    items: [OrderItemInput!]!
    subTotal: Float!
    deliveryCharge: Float!
    totalAmount: Float!
    status: String
    paymentStatus: String
    paymentMethod: String!
    deliveryAddress: DeliveryAddressInput!
    notes: String
    image: String
    couponCode: String
    isCouponApplied: Boolean
    deliveryPartner: DeliveryPartnerInput
  }

  type Query {
    getAllOrders: [Order]
    getOrderById(id: ID!): Order
  }

  type Mutation {
    placeOrder(input: PlaceOrderInput!): Order!
    deleteOrder(id: ID!): String!
  }
`;
