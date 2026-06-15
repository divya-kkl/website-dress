import { mergeResolvers } from "@graphql-tools/merge";
import { UserResolver } from "../Modules/User/User.resolvers.js";
import { ProductResolver } from "../Modules/Product/Product.resolvers.js";
import { ShopUserResolver } from "../Modules/ShopUser/ShopUser.resolvers.js";
import { CartResolver } from "../Modules/Cart/Cart.resolvers.js";
import { OrderResolver } from "../Modules/Order/Order.resolvers.js";
import { ProductCategoryResolver } from "../Modules/ProductCategories/ProductCategories.resolvers.js";
import { CouponResolver } from "../Modules/Coupon/Coupon.resolvers.js";

const resolversArray = [
    UserResolver,
    ProductResolver,
    ShopUserResolver,
    CartResolver,
    OrderResolver,
    ProductCategoryResolver,
    CouponResolver
];

export const resolvers = mergeResolvers(resolversArray);
