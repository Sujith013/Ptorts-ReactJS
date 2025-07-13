import '../App.css';
import React from 'react';
import Dogs from './dogs'
import {UncontrolledCarousel} from 'reactstrap';

function Home()
{
    return (
        <div className='hme'>
            <UncontrolledCarousel interval="5000" className='crsl' indicators={false}
                items={Dogs}  color="black"
            />
        </div>
    );
}

export default Home;