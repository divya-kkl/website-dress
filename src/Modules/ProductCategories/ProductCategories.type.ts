import { gql } from "apollo-server-express";

export const ProductCategoryType = gql`
  type ProductCategory {
    id: ID!
    name: String!
    code: String!
    description: String
    imageUrl: String
    status: String!
    parentCategoryId: String
    subCategories: [SubCategory]
    createdTime: String
  }

  input CreateProductCategoryInput {
    name: String!
    code: String!
    description: String
    imageUrl: String
    status: String
    parentCategoryId: String
  }

  input UpdateProductCategoryInput {
    name: String
    code: String
    description: String
    imageUrl: String
    status: String
    parentCategoryId: String
  }

  type Query {
    getAllProductCategories(search: String): [ProductCategory]
    getProductCategoryById(id: ID!): ProductCategory
    getProductCategories(search: String): [ProductCategory]
  }

  type Mutation {
    createProductCategory(input: CreateProductCategoryInput!): ProductCategory!
    updateProductCategory(id: ID!, input: UpdateProductCategoryInput!): ProductCategory!
    deleteProductCategory(id: ID!): String!
  }
`;
