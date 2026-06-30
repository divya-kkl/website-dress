import { gql } from "apollo-server-express";

export const DeliveryChargerType = gql`
  type DeliveryCharger {
    id: ID!
    charge: Float!
    status: String!
    createdTime: String
  }

  input CreateDeliveryChargerInput {
    charge: Float!
    status: String
  }

  input UpdateDeliveryChargerInput {
    charge: Float
    status: String
  }

  type Query {
    getAllDeliveryChargers: [DeliveryCharger]
    getDeliveryChargerById(id: ID!): DeliveryCharger
    getDeliveryCharger: DeliveryCharger
  }

  type Mutation {
    createDeliveryCharger(input: CreateDeliveryChargerInput!): DeliveryCharger!
    updateDeliveryCharger(id: ID!, input: UpdateDeliveryChargerInput!): DeliveryCharger!
    deleteDeliveryCharger(id: ID!): String!
  }
`;
