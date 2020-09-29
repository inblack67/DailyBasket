import { objectType } from '@nexus/schema';
import { Product } from './Product';
import { User } from './User';

export const Order = objectType({
    name: 'Order',
    definition(t) {
        t.id('_id');
        t.float('amount');
        t.field('user', {
            type: User
        });
        t.string('createdAt');
    }
})