import { mutationType, stringArg, idArg, floatArg } from '@nexus/schema';
import UserModel from '../../models/User';
import { User } from './User';
import { serialize } from 'cookie';
import asyncHandler from '../../middlewares/asyncHandler'
import ErrorResponse from '../errorResponse';
import { isProtected } from '../../src/isAuthenticated'
import { Category } from './Category';
import { Product } from './Product';
import { Order } from './Order';
import CategoryModel from '../../models/Category';
import ProductModel from '../../models/Product';
import OrderModel from '../../models/Order';

export const Mutation = mutationType({
    definition(t) {

        t.typeName = 'Mutations';

        t.field('addCategory', {
            type: Category,
            description: 'Add Category',
            args: { title: stringArg(), description: stringArg() },
            resolve: asyncHandler(
                async (_, { title, description }, ctx) => {
                    const createdCategory = await CategoryModel.create({ title, description });
                    const newCategory = await CategoryModel.findById(createdCategory._id).populate(['products']);
                    return newCategory;
                }
            )
        })
        t.field('addProduct', {
            type: Product,
            description: 'Add Product',
            args: { title: stringArg(), description: stringArg(), price: floatArg(), discount: floatArg({ nullable: true }), category: idArg() },
            resolve: asyncHandler(
                async (_, { title, description, price, discount, category }, ctx) => {
                    const createdProduct = await ProductModel.create({ title, description, price, discount, category });
                    const newProduct = await ProductModel.findById(createdProduct._id).populate('category');
                    return newProduct;
                }
            )
        })

        t.field('updateProduct', {
            type: Product,
            description: 'Update Product',
            nullable: true,
            args: { title: stringArg(), description: stringArg(), price: floatArg(), discount: floatArg({ nullable: true }) },
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const product = await ProductModel.findById(args.id);

                    if (!product) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    let body = {};

                    if (args.title) {
                        body.title = args.title;
                    }
                    if (args.description) {
                        body.description = args.description;
                    }
                    if (args.price) {
                        body.price = args.price;
                    }
                    if (args.discount) {
                        body.discount = args.discount;
                    }

                    const updatedProduct = await ProductModel.findByIdAndUpdate(args.id, body, { new: true }).populate('category');
                    return updatedProduct;
                }
            )
        });

        t.field('updateCategory', {
            type: Category,
            description: 'Update Category',
            nullable: true,
            args: { id: idArg(), title: stringArg({ nullable: true }), description: stringArg({ nullable: true }) },
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const category = await CategoryModel.findById(args.id);

                    if (!category) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    let body = {};

                    if (args.title) {
                        body.title = args.title;
                    }

                    if (args.description) {
                        body.description = args.description;
                    }

                    const updatedCategory = await CategoryModel.findByIdAndUpdate(args.id, body, { new: true }).populate('product');
                    return updatedCategory;
                }
            )
        });

        t.field('deleteProduct', {
            type: Product,
            description: 'Delete Product',
            nullable: true,
            args: { id: idArg() },
            resolve: asyncHandler(
                async (parent, { id }, ctx) => {

                    const product = await ProductModel.findById(id);

                    if (!product) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    return await ProductModel.findByIdAndDelete(id)
                }
            )
        });

        t.field('deleteCategory', {
            type: Category,
            description: 'Delete Category',
            nullable: true,
            args: { id: idArg() },
            resolve: asyncHandler(
                async (parent, { id }, ctx) => {

                    const category = await CategoryModel.findById(id);

                    if (!category) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    return await CategoryModel.findByIdAndDelete(id)
                }
            )
        });

        t.field('login', {
            type: User,
            description: 'Login',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: asyncHandler(
                async (parent, { email, password }, ctx) => {

                    const isAuth = await isProtected(ctx);

                    if (isAuth) {
                        throw new ErrorResponse('Not Auth!', 403);
                    }

                    const user = await UserModel.findOne({ email }).select('+password');

                    if (!user) {
                        throw new ErrorResponse('Invalid Credentials', 403);
                    }

                    const isMatch = await user.matchPassword(password);

                    if (!isMatch) {
                        throw new ErrorResponse('Invalid Credentials', 403);
                    }

                    const token = user.getSignedJwtToken();

                    ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,   // 1 hr
                        path: '/'   // root of out domain, not /api
                    }))

                    return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
                }
            )
        });

        t.field('logout', {
            type: User,
            description: 'Logout',
            nullable: true,
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);

                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Authorized', 400);
                    }

                    ctx.res.setHeader('Set-Cookie', serialize('token', 'none', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 0,
                        path: '/',
                    }))

                    return null;
                }
            )
        })

        t.field('register', {
            type: User,
            description: 'Register',
            args: {
                name: stringArg(),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: asyncHandler(
                async (parent, { name, email, password }, ctx) => {

                    const isAuth = await isProtected(ctx);

                    if (isAuth) {
                        throw new ErrorResponse('Not Auth!', 403);
                    }

                    const user = await UserModel.create({ name, email, password });
                    const token = user.getSignedJwtToken();
                    ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }));

                    return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
                }
            )
        })
    }
})
