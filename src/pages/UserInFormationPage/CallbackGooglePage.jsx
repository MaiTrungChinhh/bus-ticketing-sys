import React from 'react';
import GoogleCallback from '../../Account/CallbackGoogle';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';

const CallbackGooglePage = () => {
    return (
        <div>
            <HeaderComponent />
            <GoogleCallback />
            <FooterComponent />
        </div>
    );
}

export default CallbackGooglePage;

