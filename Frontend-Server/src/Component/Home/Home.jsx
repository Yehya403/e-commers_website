import React from 'react';
// import styles from './Home.module.css';
import FeatureComponents from '../featureComponents/featureComponents';
import Categoris from '../categoris/categoris';
import {Helmet} from "react-helmet";


function Home() {

  return (



    <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <Categoris>

      </Categoris>
      <FeatureComponents>

      </FeatureComponents>








    </>
  )

};

export default Home;
