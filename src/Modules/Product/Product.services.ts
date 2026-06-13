import { productModel } from "../../DB/MongoDB/Product/Product.js";

export const ProductService = {
    async getAllProducts(search?: string) {
        let filter = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { productName: { $regex: regex } },
                    { productCategory: { $regex: regex } }
                ]
            };
        }
        const products = await productModel.find(filter);
        return products.map((product) => ({
            id: product._id,
            productName: product.productName,
            productImage: product.productImage,
            productMrp: product.productMrp,
            productDiscount: product.productDiscount,
            productSize: product.productSize,
            productGender: product.productGender,
            productPrice: product.productPrice,
            productStock: product.productStock,
            productCategory: product.productCategory,
            createdAt: product.createdAt?.toString()
        }));
    },

    async getProductById(id: string) {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return {
            id: product._id,
            productName: product.productName,
            productImage: product.productImage,
            productMrp: product.productMrp,
            productDiscount: product.productDiscount,
            productSize: product.productSize,
            productGender: product.productGender,
            productPrice: product.productPrice,
            productStock: product.productStock,
            productCategory: product.productCategory,
            createdAt: product.createdAt?.toString()
        };
    },

    async createProduct(input: any) {
        if (input.productMrp) {
            const discount = input.productDiscount || 0;
            input.productPrice = input.productMrp - (input.productMrp * (discount / 100));
        }
        const newProduct = await productModel.create(input);
        return {
            id: newProduct._id,
            productName: newProduct.productName,
            productImage: newProduct.productImage,
            productMrp: newProduct.productMrp,
            productDiscount: newProduct.productDiscount,
            productSize: newProduct.productSize,
            productGender: newProduct.productGender,
            productPrice: newProduct.productPrice,
            productStock: newProduct.productStock,
            productCategory: newProduct.productCategory,
            createdAt: newProduct.createdAt?.toString()
        };
    },

    async updateProduct(id: string, input: any) {
        if (input.productMrp !== undefined || input.productDiscount !== undefined) {
            const product = await productModel.findById(id);
            if (product) {
                const mrp = input.productMrp !== undefined ? input.productMrp : product.productMrp;
                const discount = input.productDiscount !== undefined ? input.productDiscount : product.productDiscount;
                input.productPrice = mrp - (mrp * (discount / 100));
            }
        }
        const updatedProduct = await productModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        return {
            id: updatedProduct._id,
            productName: updatedProduct.productName,
            productImage: updatedProduct.productImage,
            productMrp: updatedProduct.productMrp,
            productDiscount: updatedProduct.productDiscount,
            productSize: updatedProduct.productSize,
            productGender: updatedProduct.productGender,
            productPrice: updatedProduct.productPrice,
            productStock: updatedProduct.productStock,
            productCategory: updatedProduct.productCategory,
            createdAt: updatedProduct.createdAt?.toString()
        };
    },

    async deleteProduct(id: string) {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error("Product not found");
        }
        return "Product deleted successfully";
    }
};