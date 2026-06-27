import { shopUserModel } from "../../DB/MongoDB/ShopUser/ShopUser.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../helpers/validation.js";

export const ShopUserService = {

    async getAllShopUsers(user: any, search?: string, page?: number, limit?: number) {
        
        let filter: any = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { shopName: { $regex: regex } },
                    { ownerName: { $regex: regex } },
                    { email: { $regex: regex } }
                ]
            };
        }
        let query = shopUserModel.find(filter);
        if (page && limit) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
        }
        const users = await query;
        return users.map((item) => ({
            id: item._id,
            shopName: item.shopName,
            ownerName: item.ownerName,
            email: item.email,
            contactNumber: item.contactNumber,
            address: item.address,
            image: item.image,
            createdAt: item.createdAt?.toString()
        }));
    },

    async getAllShopUsersPaginated(user: any, search?: string, page?: number, limit?: number) {
        let filter: any = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { shopName: { $regex: regex } },
                    { ownerName: { $regex: regex } },
                    { email: { $regex: regex } }
                ]
            };
        }
        let query = shopUserModel.find(filter);
        if (page && limit) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
        }
        const [users, totalCount] = await Promise.all([
            query.exec(),
            shopUserModel.countDocuments(filter)
        ]);
        
        return {
            users: users.map((item) => ({
                id: item._id,
                shopName: item.shopName,
                ownerName: item.ownerName,
                email: item.email,
                contactNumber: item.contactNumber,
                address: item.address,
                image: item.image,
                createdAt: item.createdAt?.toString()
            })),
            totalCount
        };
    },

    async getShopUser(search?: string, user?: any, page?: number, limit?: number) {
        return ShopUserService.getAllShopUsers(user, search, page, limit);
    },

    async getShopUserById(id: string, user: any) {
        if (!user) throw new Error("Unauthorized");
        const item = await shopUserModel.findById(id);
        if (!item) {
            throw new Error("ShopUser not found");
        }
        return {
            id: item._id,
            shopName: item.shopName,
            ownerName: item.ownerName,
            email: item.email,
            contactNumber: item.contactNumber,
            address: item.address,
            image: item.image,
            createdAt: item.createdAt?.toString()
        };
    },

    async registerShopUser(input: any = {}) {
        const { shopName, ownerName, email, password, contactNumber, address, gstNumber, image } = input;

        if (!password) {
            throw new Error("Password is required");
        }
        if (!email) {
            throw new Error("Email is required");
        }

        const exist = await shopUserModel.findOne({ email });
        if (exist) {
            throw new Error("ShopUser already exists with this email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await shopUserModel.create({
            shopName,
            ownerName,
            email,
            password: hashedPassword,
            contactNumber,
            address,
            image,
            createdAt: new Date()
        });

        const token = signToken({ id: newUser._id, email: newUser.email, role: 'shopuser' });

        return {
            user: {
                id: newUser._id,
                shopName: newUser.shopName,
                ownerName: newUser.ownerName,
                email: newUser.email,
                contactNumber: newUser.contactNumber,
                address: newUser.address,
                image: newUser.image,
                createdAt: newUser.createdAt?.toString(),
            },
            token,
        };
    },

    async loginShopUser(input: any = {}) {
        const { email, password } = input;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await shopUserModel.findOne({ email });

        if (!user || !user.password) {
            throw new Error("Invalid email or password");
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new Error("Invalid email or password");
        }

        const token = signToken({ id: user._id, email: user.email, role: 'shopuser' });

        return {
            user: {
                id: user._id,
                shopName: user.shopName,
                ownerName: user.ownerName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
                image: user.image,
                createdAt: user.createdAt?.toString(),
            },
            token
        };
    },

    async updateShopUser(id: string, input: any, user: any) {
        if (!user) throw new Error("Unauthorized");
        const updatedUser = await shopUserModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedUser) {
            throw new Error("ShopUser not found");
        }
        return {
            id: updatedUser._id,
            shopName: updatedUser.shopName,
            ownerName: updatedUser.ownerName,
            email: updatedUser.email,
            contactNumber: updatedUser.contactNumber,
            address: updatedUser.address,
            image: updatedUser.image,
            createdAt: updatedUser.createdAt?.toString(),
        };
    },

    async deleteShopUser(id: string, user: any) {
        if (!user) throw new Error("Unauthorized");
        const deletedUser = await shopUserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("ShopUser not found");
        }
        return "ShopUser deleted successfully";
    }
};
