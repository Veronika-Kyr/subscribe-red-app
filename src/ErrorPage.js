import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

export function NotFound() {
    return (
        <div className='error'>
            <h1>Page Not Found </h1>
            <p>Looks like you've followed a broken link or entered a URL that doesn't <br /> exist on this site </p>
            <p ><Link className='link' to='/'>⇐ Back to our site</Link> </p>
        </div>
    );
}