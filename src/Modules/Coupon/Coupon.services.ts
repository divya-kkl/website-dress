import { couponModel } from "../../DB/MongoDB/Coupon/Coupon.js";

const formatCoupon = (coupon: any) => ({
    id: coupon._id,
    name: coupon.name,
    code: coupon.code,
    expireDate: coupon.expireDate?.toISOString(),
    type: coupon.type,
    value: coupon.value,
    isActive: coupon.isActive,
    minimumUses: coupon.minimumUses,
    usesCount: coupon.usesCount,
    createdAt: coupon.createdAt?.toString(),
    updatedAt: coupon.updatedAt?.toString()
});

export const CouponService = {
    async getAllCoupons() {
        const coupons = await couponModel.find();
        return coupons.map(formatCoupon);
    },

    async getCouponById(id: string) {
        const coupon = await couponModel.findById(id);
        if (!coupon) throw new Error("Coupon not found");
        return formatCoupon(coupon);
    },

    async getCouponByCode(code: string) {
        const coupon = await couponModel.findOne({ code });
        if (!coupon) throw new Error("Coupon not found");
        return formatCoupon(coupon);
    },

    async createCoupon(input: any) {
        const exist = await couponModel.findOne({ code: input.code });
        if (exist) throw new Error("Coupon code already exists");
        
        const newCoupon = await couponModel.create(input);
        return formatCoupon(newCoupon);
    },

    async updateCoupon(id: string, input: any) {
        const updatedCoupon = await couponModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedCoupon) throw new Error("Coupon not found");
        return formatCoupon(updatedCoupon);
    },

    async deleteCoupon(id: string) {
        const deleted = await couponModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("Coupon not found");
        return "Coupon deleted successfully";
    },

    async incrementCouponUses(id: string) {
        const coupon = await couponModel.findByIdAndUpdate(id, { $inc: { usesCount: 1 } }, { new: true });
        if (!coupon) throw new Error("Coupon not found");
        return formatCoupon(coupon);
    }
};
