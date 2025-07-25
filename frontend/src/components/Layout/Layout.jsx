import React from 'react';
import Header from './../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollTop/ScrollTop';

const Layout = () => {
    return <>
    <ScrollToTop/>
    <Header/>
    <Routers/>
    <Footer/>
    </>;
};

export default Layout;