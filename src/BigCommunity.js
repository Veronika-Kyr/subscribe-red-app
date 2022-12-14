import React from 'react';
import "./BigCommunity.css";
import sectionSlice from './sectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Users from './Users';
import { Link } from 'react-router-dom';


export default function BigCommunity() {
    const { shouldShow } = sectionSlice.actions;
    const dispatch = useDispatch();
    const { showSect } = useSelector((state) => state.section);

    return (
        <>
            <div className='navigation'>
                <p><Link to='/'>Main</Link> </p>
            </div>
            <div className='bigCommunity'>
                <h2 className='headCommunity'>Big Community of <br />People Like You </h2>
                <button className='visibleBtn' onClick={() => { dispatch(shouldShow()) }} >{showSect ? "Hide section" : "Show section"}</button>
                {showSect && (<div className='visibleSection'>
                    <p className='textCommunity'>We're proud of our products, and we're really excited <br /> when we get feedback from our users.</p>
                    <Users />
                </div>)}
            </div>
        </>
    )
}

