import { gql } from "apollo-server-express";

export const CouponType = gql`
  type Coupon {
    id: ID!
    name: String!
    code: String!
    expireDate: String!
    type: String!
    value: Float!
    isActive: Boolean!
    minimumUses: Int!
    usesCount: Int!
    createdAt: String
    updatedAt: String
  }

  input CreateCouponInput {
    name: String!
    code: String!
    expireDate: String!
    type: String!
    value: Float!
    isActive: Boolean
    minimumUses: Int
  }

  input UpdateCouponInput {
    name: String
    code: String
    expireDate: String
    type: String
    value: Float
    isActive: Boolean
    minimumUses: Int
  }

  type Query {
    getAllCoupons(search: String, page: Int, limit: Int): [Coupon]
    getCouponById(id: ID!): Coupon
    getCoupon(search: String, page: Int, limit: Int): [Coupon]
    getCouponByCode(code: String!): Coupon
  }

  type Mutation {
    createCoupon(input: CreateCouponInput!): Coupon!
    updateCoupon(id: ID!, input: UpdateCouponInput!): Coupon!
    deleteCoupon(id: ID!): String!
    incrementCouponUses(id: ID!): Coupon!
  }
`;
