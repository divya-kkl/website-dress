import { gql } from "apollo-server-express";

export const SubCategoryType = gql`
  type SubCategory {
    id: ID!
    name: String!
    code: String!
    productCategoryId: String!
    description: String
    imageUrl: String
    status: String!
    createdTime: String
  }

  input CreateSubCategoryInput {
    name: String!
    code: String!
    productCategoryId: String!
    description: String
    imageUrl: String
    status: String
  }

  input UpdateSubCategoryInput {
    name: String
    code: String
    productCategoryId: String
    description: String
    imageUrl: String
    status: String
  }

  extend type Query {
    getAllSubCategories(search: String, page: Int, limit: Int): [SubCategory]
    getSubCategoryById(id: ID!): SubCategory
    getSubCategory(search: String, page: Int, limit: Int): [SubCategory]
  }

  extend type Mutation {
    createSubCategory(input: CreateSubCategoryInput!): SubCategory!
    updateSubCategory(id: ID!, input: UpdateSubCategoryInput!): SubCategory!
    deleteSubCategory(id: ID!): String!
  }
`;
