import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Preloader from '../../components/Preloader'
import ProductItem from '../../components/ProductItem'

const MyQuery = gql`
query ($id: ID!){
  category(id: $id){
    title
    description
    products{
        title
        description
        price
        discount
        _id
    }
  }
}
`;

const Category = () => {

    const router = useRouter();

    const { loading, data } = useQuery(MyQuery, {
        variables: {
            id: router.query.id
        }
    });

    if (loading) {
        return <Preloader />
    }

    const { category } = data;

    return (
        <div className='container'>
            <div className="center">
                <h4 className='red-text'>
                    {category.title}
                </h4>
                <p className="flow-text">
                    {category.description}
                </p>
                <p>
                    Products:
                </p>
            </div>
            <div className="row">
                {category.products.map(prod => <ProductItem key={prod._id} product={prod} />)}
            </div>
        </div>
    )
}

export default Category
