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
    isFeatured: Boolean
    productCategoriesID: String
    productCategoriesCode: String
    productCategories: ProductCategory
    variants: [Variant]!
    description: String
    material: String
    embellishment: String
    neck: String
    sleeves: String
    closure: String
    lining: String
    washCare: String
    ironCare: String
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
    isFeatured: Boolean
    productCategoriesID: String!
    productCategoriesCode: String!
    variants: [VariantInput]!
    description: String
    material: String
    embellishment: String
    neck: String
    sleeves: String
    closure: String
    lining: String
    washCare: String
    ironCare: String
  }

  input UpdateProductInput {
    name: String
    price: Float
    mrp: Float
    discountPercentage: Float
    images: [String]
    brand: String
    isFeatured: Boolean
    productCategoriesID: String
    productCategoriesCode: String
    variants: [VariantInput]
    description: String
    material: String
    embellishment: String
    neck: String
    sleeves: String
    closure: String
    lining: String
    washCare: String
    ironCare: String
  }

  type FilterOption {
    name: String!
    count: Int!
  }

  type PriceRange {
    min: Float!
    max: Float!
  }

  type StockFilter {
    inStock: Int!
    outOfStock: Int!
  }

  type CategoryFilters {
    sizes: [FilterOption]!
    colors: [FilterOption]!
    brands: [FilterOption]!
    stock: StockFilter!
    price: PriceRange!
  }

  type CategoryProductsResponse {
    products: [Product]!
    filters: CategoryFilters!
  }

  type Query {
    getAllProducts(search: String, page: Int, limit: Int): [Product]
    getTotalProductsCount(search: String): Int
    getProductById(id: ID!): Product
    getProduct(search: String, page: Int, limit: Int): [Product]
    getProductsByCategoryCode(code: String!, search: String, page: Int, limit: Int, sort: String): CategoryProductsResponse
    getCategoryFilters(code: String!): CategoryFilters
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): String!
    addProductSize(productId: ID!, input: VariantInput!): Product!
    deleteProduct(id: ID!): String!
addProductSize(productId: ID!, input: VariantInput!): Product!
  }


`;