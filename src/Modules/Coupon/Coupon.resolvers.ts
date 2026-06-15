import { CouponService } from "./Coupon.services.js";

export const CouponResolver = {
    Query: {
        getAllCoupons: async () => {
            return CouponService.getAllCoupons();
        },
        getCouponById: async (_: any, { id }: any) => {
            return CouponService.getCouponById(id);
        },
        getCouponByCode: async (_: any, { code }: any) => {
            return CouponService.getCouponByCode(code);
        }
    },
    Mutation: {
        createCoupon: async (_: any, { input }: any) => {
            return CouponService.createCoupon(input);
        },
        updateCoupon: async (_: any, { id, input }: any) => {
            return CouponService.updateCoupon(id, input);
        },
        deleteCoupon: async (_: any, { id }: any) => {
            return CouponService.deleteCoupon(id);
        },
        incrementCouponUses: async (_: any, { id }: any) => {
            return CouponService.incrementCouponUses(id);
        }
    }
};
