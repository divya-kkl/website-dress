import { FAQService } from "./FAQ.services.js";

export const FAQResolver = {
    Query: {
        getAllFAQs: async (_: any, { category }: any) => {
            return FAQService.getAllFAQs(category);
        },
        getActiveFAQs: async (_: any, { category }: any) => {
            return FAQService.getActiveFAQs(category);
        },
        getFAQById: async (_: any, { id }: any) => {
            return FAQService.getFAQById(id);
        }
    },
    Mutation: {
        createFAQ: async (_: any, { input }: any) => {
            return FAQService.createFAQ(input);
        },
        updateFAQ: async (_: any, { id, input }: any) => {
            return FAQService.updateFAQ(id, input);
        },
        deleteFAQ: async (_: any, { id }: any) => {
            return FAQService.deleteFAQ(id);
        },
        toggleFAQStatus: async (_: any, { id }: any) => {
            return FAQService.toggleFAQStatus(id);
        }
    }
};
