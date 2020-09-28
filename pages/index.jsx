import { server } from '../src/server';

const About = () => {
    return (
        <div className='container'>
            <h3>NextOverlow</h3>
            <p className="flow-text">
                Nextjs | GraphQL | Apollo | MongoDB | Materialize
          </p>
            <a href={`${server}/api/graphql`} className="btn purple pulse">
                Go Play
            </a>
            <p className="helper-text">Frontend it boring. Might make it some other time.</p>
            <hr />
            <strong>
                NextOverlow &copy; 2020
          </strong>
        </div>
    )
}

export default About
