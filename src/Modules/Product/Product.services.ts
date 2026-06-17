import { productModel } from "../../DB/MongoDB/Product/Product.js";

export const ProductService = {
    async getAllProducts(search?: string) {
        let filter = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { name: { $regex: regex } },
                    { brand: { $regex: regex } }
                ]
            };
        }
        const products = await productModel.find(filter).populate("productCategoriesID");
        return products.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            discountPercentage: product.discountPercentage,
            images: product.images,
            brand: product.brand,
            productCategoriesID: (product.productCategoriesID as any)?._id?.toString() || product.productCategoriesID?.toString() || "",
            productCategoriesCode: (product.productCategoriesID as any)?.code || "",
            productCategories: product.productCategoriesID,
            variants: product.variants,
            createdAt: product.createdAt?.toString(),
            updatedAt: (product as any).updatedAt?.toString()
        }));
    },

    async getProduct(search?: string) {
        return ProductService.getAllProducts(search);
    },

    async getProductById(id: string) {
        const product = await productModel.findById(id).populate("productCategoriesID");
        if (!product) {
            throw new Error("Product not found");
        }
        return {
            id: product._id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            discountPercentage: product.discountPercentage,
            images: product.images,
            brand: product.brand,
            productCategoriesID: (product.productCategoriesID as any)?._id?.toString() || product.productCategoriesID?.toString() || "",
            productCategoriesCode: (product.productCategoriesID as any)?.code || "",
            productCategories: product.productCategoriesID,
            variants: product.variants,
            createdAt: product.createdAt?.toString(),
            updatedAt: (product as any).updatedAt?.toString()
        };
    },

    async createProduct(input: any) {
        if (input.mrp !== undefined) {
            const discount = input.discountPercentage || 0;
            if (input.price === undefined) {
                input.price = input.mrp - (input.mrp * (discount / 100));
            }
        }
        let newProduct = await productModel.create(input);
        newProduct = await newProduct.populate("productCategoriesID");
        return {
            id: newProduct._id,
            name: newProduct.name,
            price: newProduct.price,
            mrp: newProduct.mrp,
            discountPercentage: newProduct.discountPercentage,
            images: newProduct.images,
            brand: newProduct.brand,
            productCategoriesID: (newProduct.productCategoriesID as any)?._id?.toString() || newProduct.productCategoriesID?.toString() || "",
            productCategoriesCode: (newProduct.productCategoriesID as any)?.code || "",
            productCategories: newProduct.productCategoriesID,
            variants: newProduct.variants,
            createdAt: newProduct.createdAt?.toString(),
            updatedAt: (newProduct as any).updatedAt?.toString()
        };
    },

    async updateProduct(id: string, input: any) {
        if (input.mrp !== undefined || input.discountPercentage !== undefined) {
            const product = await productModel.findById(id);
            if (product) {
                const mrp = input.mrp !== undefined ? input.mrp : product.mrp;
                const discount = input.discountPercentage !== undefined ? input.discountPercentage : product.discountPercentage;
                if (input.price === undefined) {
                    input.price = mrp - (mrp * (discount / 100));
                }
            }
        }
        let updatedProduct = await productModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        updatedProduct = await updatedProduct.populate("productCategoriesID");
        return {
            id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            mrp: updatedProduct.mrp,
            discountPercentage: updatedProduct.discountPercentage,
            images: updatedProduct.images,
            brand: updatedProduct.brand,
            productCategoriesID: (updatedProduct.productCategoriesID as any)?._id?.toString() || updatedProduct.productCategoriesID?.toString() || "",
            productCategoriesCode: (updatedProduct.productCategoriesID as any)?.code || "",
            productCategories: updatedProduct.productCategoriesID,
            variants: updatedProduct.variants,
            createdAt: updatedProduct.createdAt?.toString(),
            updatedAt: (updatedProduct as any).updatedAt?.toString()
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