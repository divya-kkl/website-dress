import { productModel } from "../../DB/MongoDB/Product/Product.js";

export const ProductService = {
    async getAllProducts(search?: string, page?: number, limit?: number) {
        let filter: any = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { name: { $regex: regex } },
                    { brand: { $regex: regex } },
                ]
            };
        }

        let query = productModel.find(filter).populate("productCategoriesID").sort({ createdAt: -1 });
        if (page && limit) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
        }

        const products = await query;
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
            description: product.description,
            material: product.material,
            embellishment: product.embellishment,
            neck: product.neck,
            sleeves: product.sleeves,
            closure: product.closure,
            lining: product.lining,
            washCare: product.washCare,
            ironCare: product.ironCare,
            createdAt: product.createdAt?.toString(),
            updatedAt: (product as any).updatedAt?.toString()
        }));
    },

    async getTotalProductsCount(search?: string) {
        let filter: any = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { name: { $regex: regex } },
                    { brand: { $regex: regex } },
                ]
            };
        }
        return await productModel.countDocuments(filter);
    },

    async getProduct(search?: string, page?: number, limit?: number) {
        return ProductService.getAllProducts(search, page, limit);
    },

    async getProductsByCategoryCode(code: string, search?: string, page?: number, limit?: number) {
        // First find the category by code
        const { productCategoryMOdel } = await import("../../DB/MongoDB/ProductCategories/ProductCategories.js");
        const category = await productCategoryMOdel.findOne({ code: { $regex: new RegExp(`^${code}$`, 'i') } });

        if (!category) {
            return [];
        }

        let filter: any = {
            $or: [
                { productCategoriesID: category._id },
                { productCategoriesCode: { $regex: new RegExp(`^${code}$`, 'i') } }
            ]
        };

        if (search) {
            const regex = new RegExp(search, 'i');
            filter = {
                $and: [
                    filter,
                    {
                        $or: [
                            { name: { $regex: regex } },
                            { brand: { $regex: regex } }
                        ]
                    }
                ]
            };
        }

        let query = productModel.find(filter).populate("productCategoriesID").sort({ createdAt: -1 });
        if (page && limit) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
        }
        const products = await query;
        const mappedProducts = products.map((product) => ({
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
            description: product.description,
            material: product.material,
            embellishment: product.embellishment,
            neck: product.neck,
            sleeves: product.sleeves,
            closure: product.closure,
            lining: product.lining,
            washCare: product.washCare,
            ironCare: product.ironCare,
            createdAt: product.createdAt?.toString(),
            updatedAt: (product as any).updatedAt?.toString()
        }));

        const filters = await ProductService.getCategoryFilters(code);

        return {
            products: mappedProducts,
            filters: filters
        };
    },

    async getCategoryFilters(code: string) {
        const { productCategoryMOdel } = await import("../../DB/MongoDB/ProductCategories/ProductCategories.js");
        const category = await productCategoryMOdel.findOne({ code: { $regex: new RegExp(`^${code}$`, 'i') } });
        
        let filter: any = { 
            $or: [
                { productCategoriesCode: { $regex: new RegExp(`^${code}$`, 'i') } }
            ]
        };

        if (category) {
            filter.$or.push({ productCategoriesID: category._id });
        }

        const products = await productModel.find(filter);

        const sizes: any = {};
        const colors: any = {};
        const brands: any = {};
        let inStock = 0;
        let outOfStock = 0;
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        products.forEach(p => {
            const hasStock = p.variants?.some(v => v.stock > 0);
            if (hasStock) inStock++;
            else outOfStock++;

            if (p.price < minPrice) minPrice = p.price;
            if (p.price > maxPrice) maxPrice = p.price;

            if (p.brand) {
                brands[p.brand] = (brands[p.brand] || 0) + 1;
            }

            p.variants?.forEach(v => {
                if (v.size) sizes[v.size] = (sizes[v.size] || 0) + 1;
                if (v.color) colors[v.color] = (colors[v.color] || 0) + 1;
            });
        });

        if (minPrice === Infinity) minPrice = 0;
        if (maxPrice === -Infinity) maxPrice = 0;

        return {
            sizes: Object.entries(sizes).map(([name, count]) => ({ name, count: count as number })).sort((a,b) => b.count - a.count),
            colors: Object.entries(colors).map(([name, count]) => ({ name, count: count as number })).sort((a,b) => b.count - a.count),
            brands: Object.entries(brands).map(([name, count]) => ({ name, count: count as number })).sort((a,b) => b.count - a.count),
            stock: { inStock, outOfStock },
            price: { min: minPrice, max: maxPrice }
        };
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
            description: product.description,
            material: product.material,
            embellishment: product.embellishment,
            neck: product.neck,
            sleeves: product.sleeves,
            closure: product.closure,
            lining: product.lining,
            washCare: product.washCare,
            ironCare: product.ironCare,
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
            description: newProduct.description,
            material: newProduct.material,
            embellishment: newProduct.embellishment,
            neck: newProduct.neck,
            sleeves: newProduct.sleeves,
            closure: newProduct.closure,
            lining: newProduct.lining,
            washCare: newProduct.washCare,
            ironCare: newProduct.ironCare,
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
            description: updatedProduct.description,
            material: updatedProduct.material,
            embellishment: updatedProduct.embellishment,
            neck: updatedProduct.neck,
            sleeves: updatedProduct.sleeves,
            closure: updatedProduct.closure,
            lining: updatedProduct.lining,
            washCare: updatedProduct.washCare,
            ironCare: updatedProduct.ironCare,
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
    },

    async addProductSize(productId: string, input: any) {
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        
        // Add the new variant
        product.variants.push(input);
        
        let updatedProduct = await product.save();
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
            description: updatedProduct.description,
            material: updatedProduct.material,
            embellishment: updatedProduct.embellishment,
            neck: updatedProduct.neck,
            sleeves: updatedProduct.sleeves,
            closure: updatedProduct.closure,
            lining: updatedProduct.lining,
            washCare: updatedProduct.washCare,
            ironCare: updatedProduct.ironCare,
            createdAt: updatedProduct.createdAt?.toString(),
            updatedAt: (updatedProduct as any).updatedAt?.toString()
        };
    }
};