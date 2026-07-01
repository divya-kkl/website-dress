import { FAQModel } from "../../DB/MongoDB/FAQ/FAQ.js";

const mapFAQ = (faq: any) => ({
    id: faq._id,
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    order: faq.order,
    isActive: faq.isActive,
    createdAt: faq.createdAt?.toString(),
    updatedAt: faq.updatedAt?.toString()
});

export const FAQService = {
    async getAllFAQs(category?: string) {
        const query: any = {};
        if (category) query.category = category;
        const faqs = await FAQModel.find(query).sort({ order: 1, createdAt: -1 });
        return faqs.map(mapFAQ);
    },

    async getActiveFAQs(category?: string) {
        const query: any = { isActive: true };
        if (category) query.category = category;
        const faqs = await FAQModel.find(query).sort({ order: 1, createdAt: -1 });
        return faqs.map(mapFAQ);
    },

    async getFAQById(id: string) {
        const faq: any = await FAQModel.findById(id);
        if (!faq) throw new Error("FAQ not found");
        return mapFAQ(faq);
    },

    async createFAQ(input: any) {
        const newFAQ: any = await FAQModel.create(input);
        return mapFAQ(newFAQ);
    },

    async updateFAQ(id: string, input: any) {
        const updated: any = await FAQModel.findByIdAndUpdate(
            id,
            { $set: input },
            { new: true }
        );
        if (!updated) throw new Error("FAQ not found");
        return mapFAQ(updated);
    },

    async deleteFAQ(id: string) {
        const deleted = await FAQModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("FAQ not found");
        return "FAQ deleted successfully";
    },

    async toggleFAQStatus(id: string) {
        const faq: any = await FAQModel.findById(id);
        if (!faq) throw new Error("FAQ not found");
        faq.isActive = !faq.isActive;
        await faq.save();
        return mapFAQ(faq);
    }
};
