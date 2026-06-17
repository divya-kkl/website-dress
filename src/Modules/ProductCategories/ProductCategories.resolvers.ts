import { ProductCategoryService } from "./ProductCategories.services.js";

import { SubCategoryService } from "../SubCategories/SubCategories.services.js";

export const ProductCategoryResolver = {
    Query: {
        getAllProductCategories: async (_: any, __: any, context: any) => {
            return ProductCategoryService.getAllProductCategories(__.search);
        },
        getProductCategoryById: async (_: any, __: any, context: any) => {
            return ProductCategoryService.getProductCategoryById(__.id);
        },
        getProductCategories: async (_: any, __: any, context: any) => {
            return ProductCategoryService.getAllProductCategories(__.search);
        }
    },
    Mutation: {
        createProductCategory: async (_: any, __: any, context: any) => {
            return ProductCategoryService.createProductCategory(__.input);
        },
        updateProductCategory: async (_: any, __: any, context: any) => {
            return ProductCategoryService.updateProductCategory(__.id, __.input);
        },
        deleteProductCategory: async (_: any, __: any, context: any) => {
            return ProductCategoryService.deleteProductCategory(__.id);
        }
    },
    ProductCategory: {
        subCategories: async (parent: any) => {
            const allSubCategories = await SubCategoryService.getAllSubCategories();
            return allSubCategories.filter((sub: any) => sub.productCategoryId === parent.id);
        }
    }
};
