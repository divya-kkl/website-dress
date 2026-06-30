import { BrandService } from "./Brand.services.js";

export const BrandResolver = {
    Query: {
        getAllBrands: async (_: any, __: any, context: any) => {
            return BrandService.getAllBrands();
        },
        getBrandById: async (_: any, { id }: any, context: any) => {
            return BrandService.getBrandById(id);
        }
    },
    Mutation: {
        createBrand: async (_: any, { input }: any, context: any) => {
            return BrandService.createBrand(input);
        },
        updateBrand: async (_: any, { id, input }: any, context: any) => {
            return BrandService.updateBrand(id, input);
        },
        deleteBrand: async (_: any, { id }: any, context: any) => {
            return BrandService.deleteBrand(id);
        }
    }
};
