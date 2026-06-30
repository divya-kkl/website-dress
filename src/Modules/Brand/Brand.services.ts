import { brandModel } from "../../DB/MongoDB/Brand/Brand.js";

export const BrandService = {
    async getAllBrands() {
        const brands = await brandModel.find().sort({ name: 1 });
        return brands.map(brand => ({
            id: brand._id,
            name: brand.name,
            status: brand.status,
            createdTime: brand.createdTime?.toString()
        }));
    },

    async getBrandById(id: string) {
        const brand = await brandModel.findById(id);
        if (!brand) {
            throw new Error("Brand not found");
        }
        return {
            id: brand._id,
            name: brand.name,
            status: brand.status,
            createdTime: brand.createdTime?.toString()
        };
    },

    async createBrand(input: any) {
        const existing = await brandModel.findOne({ name: { $regex: new RegExp(`^${input.name}$`, 'i') } });
        if (existing) {
            throw new Error("Brand with this name already exists");
        }
        const newBrand = await brandModel.create(input);
        return {
            id: newBrand._id,
            name: newBrand.name,
            status: newBrand.status,
            createdTime: newBrand.createdTime?.toString()
        };
    },

    async updateBrand(id: string, input: any) {
        const updatedBrand = await brandModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedBrand) {
            throw new Error("Brand not found");
        }
        return {
            id: updatedBrand._id,
            name: updatedBrand.name,
            status: updatedBrand.status,
            createdTime: updatedBrand.createdTime?.toString()
        };
    },

    async deleteBrand(id: string) {
        const deletedBrand = await brandModel.findByIdAndDelete(id);
        if (!deletedBrand) {
            throw new Error("Brand not found");
        }
        return "Brand deleted successfully";
    }
};
