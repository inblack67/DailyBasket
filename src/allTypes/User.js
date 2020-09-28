import { objectType } from '@nexus/schema';
import { Order } from './Order';

export const User = objectType({
    name: 'User',
    definition(t) {
        t.string('name');
        t.string('email');
        t.string('password', { nullable: true });
        t.list.field('orders', {
            type: Order,
            nullable: true
        });
        t.string('createdAt');
        t.id('_id');
    }
})