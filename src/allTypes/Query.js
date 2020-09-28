import { queryType, idArg } from '@nexus/schema';
import { isProtected } from '../isAuthenticated';
import ErrorResponse from '../errorResponse';
import { User } from './User';
import asyncHandler from '../../middlewares/asyncHandler';
import { Category } from './Category';
import { Product } from './Product';
import { Order } from './Order';
import CategoryModel from '../../models/Category';
import ProductModel from '../../models/Product';
import OrderModel from '../../models/Order';

export const Query = queryType({
    definition(t) {

        t.list.field('categoryProducts', {
            type: Product,
            description: 'Get All Products Of A Category',
            args: {
                category: idArg()
            },
            resolve: asyncHandler(
                async (_, { category }) => {
                    const products = await ProductModel.find({ category }).populate('category');
                    return products;
                }
            )
        })

        t.field('product', {
            type: Product,
            description: 'Get Single Product',
            args: {
                id: idArg()
            },
            resolve: asyncHandler(
                async (_, { id }) => {
                    const product = await ProductModel.findById(id).populate('category');
                    return product;
                }
            )
        })

        t.field('category', {
            type: Category,
            description: 'Get Single Category',
            args: {
                id: idArg()
            },
            resolve: asyncHandler(
                async (_, { id }) => {
                    const category = await CategoryModel.findById(id).populate('products');
                    return category;
                }
            )
        })

        t.list.field('categories', {
            type: Category,
            description: 'Get All Categories',
            resolve: asyncHandler(
                async () => {
                    const categories = await CategoryModel.find().populate('products');
                    return categories;
                }
            )
        })

        t.list.field('products', {
            type: Product,
            description: 'Get All Products',
            resolve: asyncHandler(
                async () => {
                    const products = await ProductModel.find().populate('category');
                    return products;
                }
            )
        })

        t.field('getMe', {
            type: User,
            description: 'Get Logged In User',
            resolve: asyncHandler(
                async (parent, args, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!', 401);
                    }
                    return ctx.req.user;
                }
            )
        });
    }
})