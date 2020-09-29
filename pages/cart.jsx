import { Fragment } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Preloader from '../components/Preloader'
import Link from 'next/link'
import Gateway from '../components/Gateway'

const MyQuery = gql`
{
  cartProducts{
    amount
    _id
    product{
        title
    }
  }
}
`;

const deleteProductMutation = gql`
mutation ($product: ID!){
    deleteFromCart (product: $product){
        product{
            title
        }
    }
}
`;

const cart = () => {

    const { loading, data } = useQuery(MyQuery);
    const [deleteProduct, mutationRes] = useMutation(deleteProductMutation, {
        refetchQueries: [
            {
                query: MyQuery
            }
        ]
    });

    if (loading) {
        return <Preloader />
    }

    if (mutationRes.loading) {
        return <Preloader />
    }

    const amount = data ? data.cartProducts.reduce((prev, curr) => curr.amount + prev, 0) : 0.00

    return (
        <div className='container'>
            <p className="flow-text center">Your <span className="red-text">Cart</span></p>
            <ul className="collection">
                {data && data.cartProducts.map(pro => <li key={pro._id} className='collection-item'>
                    <span className='blue-text'>
                        {pro.product.title}
                    </span>
                    <div className="secondary-content">
                        <span className="green-text">
                            {pro.amount} Rs.
                        </span>
                        <a href='#!' className="secondary-content red-text" onClick={e => {
                            deleteProduct({
                                variables: {
                                    product: pro._id
                                }
                            }).then(() => {
                                M.toast({ html: 'Item Deleted' })
                            }).catch(err => console.error(err))
                        }}>
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                </li>)}
            </ul>
            <Gateway amount={amount} />
            <div className='card black white-text center'>
                <div className="card-content">
                    <span className="card-title">
                        Total Amount: <span className="red-text">
                            {amount} Rs.
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default cart
