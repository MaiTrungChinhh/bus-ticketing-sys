import React from 'react';
import UserInformation from '../../Account/UserInformation';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';

const UserInformationPage = () => {
    return (
        <div>
            <HeaderComponent />
            <UserInformation />
            <FooterComponent />
        </div>
    );
}

export default UserInformationPage;

