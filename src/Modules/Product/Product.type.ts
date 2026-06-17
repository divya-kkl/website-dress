import { gql } from "apollo-server-express";

export const ProductType = gql`
  type Variant {
    color: String!
    size: String!
    stock: Float!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    mrp: Float!
    discountPercentage: Float
    images: [String]!
    brand: String!
    productCategoriesID: String!
    productCategoriesCode: String!
    productCategories: ProductCategory!
    variants: [Variant]!
    createdAt: String
    updatedAt: String
  }

  input VariantInput {
    color: String!
    size: String!
    stock: Float!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    mrp: Float!
    discountPercentage: Float
    images: [String]!
    brand: String!
    productCategoriesID: String!
    productCategoriesCode: String!
    variants: [VariantInput]!
  }

  input UpdateProductInput {
    name: String
    price: Float
    mrp: Float
    discountPercentage: Float
    images: [String]
    brand: String
    productCategoriesID: String
    productCategoriesCode: String!
    variants: [VariantInput]
  }

  type Query {
    getAllProducts(search: String): [Product]
    getProductById(id: ID!): Product
    getProduct(search: String): [Product]
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): String!
  }
`;