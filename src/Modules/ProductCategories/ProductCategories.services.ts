import { productCategoryMOdel } from "../../DB/MongoDB/ProductCategories/ProductCategories.js";

export const ProductCategoryService = {
    async getAllProductCategories(search?: string) {
        let filter = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { name: { $regex: regex } },
                    { code: { $regex: regex } }
                ]
            };
        }
        const categories = await productCategoryMOdel.find(filter);
        return categories.map((category) => ({
            id: category._id,
            name: category.name,
            code: category.code,
            description: category.description,
            imageUrl: category.imageUrl,
            status: category.status,
            createdTime: category.createdTime?.toString()
        }));
    },

    async getProductCategories(search?: string) {
        return ProductCategoryService.getAllProductCategories(search);
    },

    async getProductCategoryById(id: string) {
        const category = await productCategoryMOdel.findById(id);
        if (!category) {
            throw new Error("Product Category not found");
        }
        return {
            id: category._id,
            name: category.name,
            code: category.code,
            description: category.description,
            imageUrl: category.imageUrl,
            status: category.status,
            createdTime: category.createdTime?.toString()
        };
    },

    async createProductCategory(input: any) {
        const newCategory = await productCategoryMOdel.create(input);
        return {
            id: newCategory._id,
            name: newCategory.name,
            code: newCategory.code,
            description: newCategory.description,
            imageUrl: newCategory.imageUrl,
            status: newCategory.status,
            createdTime: newCategory.createdTime?.toString()
        };
    },

    async updateProductCategory(id: string, input: any) {
        const updatedCategory = await productCategoryMOdel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedCategory) {
            throw new Error("Product Category not found");
        }
        return {
            id: updatedCategory._id,
            name: updatedCategory.name,
            code: updatedCategory.code,
            description: updatedCategory.description,
            imageUrl: updatedCategory.imageUrl,
            status: updatedCategory.status,
            createdTime: updatedCategory.createdTime?.toString()
        };
    },

    async deleteProductCategory(id: string) {
        const deletedCategory = await productCategoryMOdel.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Product Category not found");
        }
        return "Product Category deleted successfully";
    }
};
