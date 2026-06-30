import { gql } from "apollo-server-express";

export const BrandModuleType = gql`
  type Brand {
    id: ID!
    name: String!
    status: String!
    createdTime: String
  }

  input CreateBrandInput {
    name: String!
    status: String
  }

  input UpdateBrandInput {
    name: String
    status: String
  }

  type Query {
    getAllBrands: [Brand]
    getBrandById(id: ID!): Brand
  }

  type Mutation {
    createBrand(input: CreateBrandInput!): Brand!
    updateBrand(id: ID!, input: UpdateBrandInput!): Brand!
    deleteBrand(id: ID!): String!
  }
`;
