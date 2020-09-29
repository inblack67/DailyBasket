import { gql, useQuery } from '@apollo/client';
import Preloader from '../components/Preloader';
import CategoryItem from '../components/CategoryItem';
import { initializeApollo } from '../src/apollo'

const MyQuery = gql`
{
    categories{
        title,
        description
        _id,
        products{
            title
        }
    }
}
`;

const Home = () => {

    const { loading, data } = useQuery(MyQuery);

    if (loading) {
        return <Preloader />
    }

    const { categories } = data;

    return (
        <div className='container'>
            <p className="flow-text center">Categories</p>
            <div className="row">
                {categories.map(cat => <CategoryItem key={cat._id} category={cat} />)}
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: MyQuery
    });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        }
    }
}

export default Home

