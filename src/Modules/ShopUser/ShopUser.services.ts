import { shopUserModel } from "../../DB/MongoDB/ShopUser/ShopUser.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../helpers/validation.js";

export const ShopUserService = {

    async getAllShopUsers(user: any) {
        if (!user) throw new Error("Unauthorized");
        const users = await shopUserModel.find();
        return users.map((item) => ({
            id: item._id,
            shopName: item.shopName,
            ownerName: item.ownerName,
            email: item.email,
            contactNumber: item.contactNumber,
            address: item.address,
            createdAt: item.createdAt?.toString()
        }));
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
            createdAt: item.createdAt?.toString()
        };
    },

    async registerShopUser(input: any = {}) {
        const { shopName, ownerName, email, password, contactNumber, address, gstNumber } = input;

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
