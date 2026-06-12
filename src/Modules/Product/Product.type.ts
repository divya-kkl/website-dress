import { gql } from "apollo-server-express";

export const ProductType = gql`
  type Product {
    id: ID!
    productName: String!
    productImage: String!
    productMrp: Float!
    productDiscount: Float
    productSize: Float!
    productGender: String!
    productPrice: Float!
    productStock: Float!
    productCategory: String!
    createdAt: String
  }

  input CreateProductInput {
    productName: String!
    productImage: String!
    productMrp: Float!
    productDiscount: Float
    productSize: Float!
    productGender: String!
    productPrice: Float!
    productStock: Float!
    productCategory: String!
  }

  input UpdateProductInput {
    productName: String
    productImage: String
    productMrp: Float
    productDiscount: Float
    productSize: Float
    productGender: String
    productPrice: Float
    productStock: Float
    productCategory: String
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): String!
  }
`;