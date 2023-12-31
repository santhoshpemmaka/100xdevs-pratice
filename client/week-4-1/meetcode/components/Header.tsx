import React from 'react';
import LogoImage from '../assets/download.png';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

    return (
        <div className='header-component'>
            <Link href="/" className='link-tag'>
                <div className='logo-component'>
                    <Image className='image-component' src={LogoImage} alt="logo-image"/>
                <h3>Meetcode</h3>
                </div>
            </Link>
            <Link href="/" className='link-tag'>
                <h3>Problems</h3>
            </Link>
            <Link href="/signup" className='link-tag'>
                <h3>Signup</h3>
            </Link>
            <Link href="/login" className='link-tag'>
                <h3>Login</h3>
            </Link>
        </div>
    )
};

export default Header;