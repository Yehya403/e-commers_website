import React from 'react';
import PropTypes from 'prop-types';
import styles from './About.module.css';
import {Helmet} from "react-helmet";


const About = () => (
  <div className={styles.About}>
     <Helmet>
                <meta charSet="utf-8" />
                <title>About</title>
            </Helmet>
  </div>
);

About.propTypes = {};

About.defaultProps = {};

export default About;
