import React, { useState, useEffect } from 'react';
import "./JoinProgram.css";
import { fetchSubscribe } from './subscribeSlice';
import { fetchUnsubscribe } from './unsubscribeSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function JoinProgram() {
    const [email, setEmail] = useState('');
    const [clickedSubBTN, setclickedSubBTN] = useState(false);
    const [clickedunSubBTN, setclickedunSubBTN] = useState(false);
    // const [isSubscribed, setIsSubscribed] = useState(false);
    const [disabledBtn, setdisabledBtn] = useState(false);
    // const state = useSelector((state) => state);
    const subscribe = useSelector((state) => state.subscribing);
    const unsubscribe = useSelector((state) => state.unsubscribing);

    // const { subscribe, unsubscribe } = state;
    const dispatch = useDispatch();
    // console.log(state);

    useEffect(() => {
        if (!clickedSubBTN) return;
        setdisabledBtn(true);
        dispatch(fetchSubscribe('http://localhost:3000/subscribe'), {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email })
        })
    }, [dispatch, clickedSubBTN])


    useEffect(() => {
        if (!clickedunSubBTN) return;
        setdisabledBtn(true);

        dispatch(fetchUnsubscribe('http://localhost:3000/unsubscribe'), {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
    }, [dispatch, clickedunSubBTN])






    useEffect(() => {
        if (subscribe.isSubscribed) {
            // setdisabledBtn(true);

            // fetch('http://localhost:3000/subscribe', {

            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ "email": email })
            // })
            //     .then((resp) => resp.json())
            //     .then((data) => {
            //         if (data.error) {
            //             window.alert(data.error);
            //             setclickedSubBTN(false);
            //             unsubscribeView();
            //             throw Error();
            //         }
            //         else {
            subscribeView();
            // console.log(data);
        }
        // })
        // .catch(error => {
        //     console.log(error);
        //     unsubscribeView();
        //     setclickedSubBTN(false);
        // })
    }, [subscribe.isSubscribed]);

    useEffect(() => {
        if (!clickedunSubBTN) { return }

        setdisabledBtn(true);
        fetch('http://localhost:3000/unsubscribe', {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((resp) => resp.json())
            .then((data) => {
                unsubscribeView();
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                subscribeView();
                setclickedunSubBTN(false);
            })
    }, [clickedunSubBTN]);

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function subscribeView() {
        setdisabledBtn(false);
        // setIsSubscribed(true);
        setclickedSubBTN(false);
    }

    function unsubscribeView() {
        setdisabledBtn(false);
        // setIsSubscribed(false);
        setEmail('');
        setclickedunSubBTN(false);
    }

    return (
        <div className='joinProgram'>
            <div className='joinProgram_cover'>
                <h2 className='joinHeader'> Join Our Program</h2>
                <p className='joinText'> Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua</p>
                <form className='joinForm'>
                    {unsubscribe.isSubscribed && (<input className='joinMail' placeholder='E-mail' value={email} type="text" onChange={getEmail} />)}
                    {unsubscribe.isSubscribed && (<input className='joinBtns' type="submit" value="SUBSCRIBE" disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedSubBTN(true); }} />)}
                    {subscribe.isSubscribed && (<button className='joinBtns' type='submit' disabled={disabledBtn} onClick={(e) => { e.preventDefault(); setclickedunSubBTN(true); }} >UNSUBSCRIBE</button>)}
                </form>
            </div>
        </div>
    )

}