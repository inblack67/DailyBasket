import { server } from '../src/server';

const About = () => {
    return (
        <div className='container center'>
            <h4>Daily<span className="red-text">Basket</span></h4>
            <div>
                <hr />
                <h5>E-Commerce Web App With Next.js And GraphQL</h5>
                <p>
                    Nextjs | GraphQL | Nexus Schema | Apollo | MongoDB | Stripe Payments | Materialize
          </p>
                {process.env.NODE_ENV !== 'production' ? <a target='_blank' rel='noopener noreferrer' href={`${server}/api/graphql`} className="pulse btn red">
                    Go Play
            </a> : null}
                <p>
                    <strong>
                        Daily<span className="red-text">Basket</span> &copy; 2020
                </strong>
                </p>
                <a href="https://github.com/inblack67/Heeko-Assignment" rel='noopener noreferrer' target='_blank'>
                    <i className="fab fa-github fa-2x red-text"></i>
                </a>
            </div>
        </div>
    )
}

export default About
