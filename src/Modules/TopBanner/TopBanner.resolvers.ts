import { TopBannerService } from "./TopBanner.services.js";

export const TopBannerResolver = {
    Query: {
        getAllTopBanners: async (_: any, __: any, context: any) => {
            return TopBannerService.getAllTopBanners();
        },
        getActiveTopBanners: async (_: any, __: any, context: any) => {
            return TopBannerService.getActiveTopBanners();
        }
    },
    Mutation: {
        createTopBanner: async (_: any, __: any, context: any) => {
            return TopBannerService.createTopBanner(__.input);
        },
        updateTopBanner: async (_: any, __: any, context: any) => {
            return TopBannerService.updateTopBanner(__.id, __.input);
        },
        deleteTopBanner: async (_: any, __: any, context: any) => {
            return TopBannerService.deleteTopBanner(__.id);
        }
    }
};
