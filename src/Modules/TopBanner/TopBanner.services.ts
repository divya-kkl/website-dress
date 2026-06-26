import { TopBannerModel } from "../../DB/MongoDB/TopBanner/TopBanner.js";

export const TopBannerService = {
    async getAllTopBanners() {
        return TopBannerModel.find().sort({ createdAt: -1 });
    },

    async getActiveTopBanners() {
        return TopBannerModel.find({ isActive: true }).sort({ createdAt: -1 });
    },

    async createTopBanner(input: any) {
        return TopBannerModel.create(input);
    },

    async updateTopBanner(id: string, input: any) {
        const topBanner = await TopBannerModel.findByIdAndUpdate(id, input, { new: true });
        if (!topBanner) {
            throw new Error("Top Banner not found");
        }
        return topBanner;
    },

    async deleteTopBanner(id: string) {
        const topBanner = await TopBannerModel.findByIdAndDelete(id);
        if (!topBanner) {
            throw new Error("Top Banner not found");
        }
        return "Top Banner deleted successfully";
    }
};
