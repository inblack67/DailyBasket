import { objectType } from '@nexus/schema';
import { Product } from './Product';
import { User } from './User';

export const Cart = objectType({
    name: 'Cart',
    definition(t) {
        t.id('_id');
        t.float('amount');
        t.field('product', {
            type: Product,
            nullable: true
        });
        t.field('user', {
            type: User,
            nullable: true
        });
        t.string('createdAt');
    }
})