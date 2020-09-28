import { objectType } from '@nexus/schema';
import { Product } from './Product';

export const Category = objectType({
    name: 'Category',
    definition(t) {
        t.id('_id');
        t.string('title');
        t.string('description');
        t.list.field('products', {
            type: Product,
            nullable: true
        });
        t.string('createdAt');
    }
})