import { mergeResolvers } from "@graphql-tools/merge";
import { UserResolver } from "../Modules/User/User.resolvers.js";
import { ProductResolver } from "../Modules/Product/Product.resolvers.js";
import { ShopUserResolver } from "../Modules/ShopUser/ShopUser.resolvers.js";
import { CartResolver } from "../Modules/Cart/Cart.resolvers.js";

const resolversArray = [
    UserResolver,
    ProductResolver,
    ShopUserResolver,
    CartResolver
];

export const resolvers = mergeResolvers(resolversArray);
