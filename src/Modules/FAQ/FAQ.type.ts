import { gql } from "apollo-server-express";

export const FAQType = gql`
  type FAQ {
    id: ID!
    question: String!
    answer: String!
    category: String
    order: Int
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  input FAQInput {
    question: String!
    answer: String!
    category: String
    order: Int
    isActive: Boolean
  }

  input UpdateFAQInput {
    question: String
    answer: String
    category: String
    order: Int
    isActive: Boolean
  }

  extend type Query {
    getAllFAQs(category: String): [FAQ]
    getActiveFAQs(category: String): [FAQ]
    getFAQById(id: ID!): FAQ
  }

  extend type Mutation {
    createFAQ(input: FAQInput!): FAQ!
    updateFAQ(id: ID!, input: UpdateFAQInput!): FAQ!
    deleteFAQ(id: ID!): String!
    toggleFAQStatus(id: ID!): FAQ!
  }
`;
