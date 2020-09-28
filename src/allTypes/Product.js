import { objectType } from '@nexus/schema';
import { Category } from './Category';

export const Product = objectType({
    name: 'Product',
    definition(t) {
        t.id('_id');
        t.string('title');
        t.string('description');
        t.float('price');
        t.float('discount');
        t.field('category', {
            type: Category
        });
        t.string('createdAt');
    }
})