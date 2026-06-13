import { ProductService } from "./Product.services.js";

export const ProductResolver = {
    Query: {
        getAllProducts: async (_: any, __: any, context: any) => {
            return ProductService.getAllProducts(__.search);
        },
        getProductById: async (_: any, __: any, context: any) => {
            return ProductService.getProductById(__.id);
        }
    },
    Mutation: {
        createProduct: async (_: any, __: any, context: any) => {
            return ProductService.createProduct(__.input);
        },
        updateProduct: async (_: any, __: any, context: any) => {
            return ProductService.updateProduct(__.id, __.input);
        },
        deleteProduct: async (_: any, __: any, context: any) => {
            return ProductService.deleteProduct(__.id);
        }
    }
};