import { gql } from "apollo-server-express";

export const TopBannerType = gql`
  type TopBanner {
    id: ID!
    message: String!
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  input TopBannerInput {
    message: String!
    isActive: Boolean
  }

  input UpdateTopBannerInput {
    message: String
    isActive: Boolean
  }

  extend type Query {
    getAllTopBanners: [TopBanner]
    getActiveTopBanners: [TopBanner]
  }

  extend type Mutation {
    createTopBanner(input: TopBannerInput!): TopBanner!
    updateTopBanner(id: ID!, input: UpdateTopBannerInput!): TopBanner!
    deleteTopBanner(id: ID!): String!
  }
`;
