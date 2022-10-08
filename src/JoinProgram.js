import React, { useState, useEffect } from 'react';
import "./JoinProgram.css";
import { fetchSubscribe } from './subscribeSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function JoinProgram() {
    const [email, setEmail] = useState('');
    const [clickedSubBTN, setclickedSubBTN] = useState(false);
    const [clickedunSubBTN, setclickedunSubBTN] = useState(false);
    const [disabledBtn, setdisabledBtn] = useState(false);
    const subscribe = useSelector((state) => state.subscribing);

    const dispatch = useDispatch();
    function getEmail(event) {
        setEmail(event.target.value);
    }

    function handleSubscribe(e) {
        e.preventDefault();
        setclickedSubBTN(true);
        let umail = { "email": email };
        dispatch(fetchSubscribe({ api: 'http://localhost:3000/subscribe', email: umail }));
    }

    function handleUnsubscribe(e) {
        e.preventDefault();
        setclickedunSubBTN(true);
        dispatch(fetchSubscribe({ api: 'http://localhost:3000/unsubscribe' }));
    }

    useEffect(() => {
        if (!clickedSubBTN) return;
        setdisabledBtn(true);
        if (subscribe.isSubscribed) {
            setdisabledBtn(false);
            setclickedSubBTN(false);
        }
    }, [clickedSubBTN, subscribe.isSubscribed])

    useEffect(() => {
        if (subscribe.data.error) {
            window.alert(subscribe.data.error);
            setclickedSubBTN(false);
            setdisabledBtn(false);
            setEmail('');
            setclickedunSubBTN(false);
        }
    }, [subscribe.data.error])

    useEffect(() => {
        if (!clickedunSubBTN) return;
        setdisabledBtn(true);
        if (!subscribe.isSubscribed) {
            setdisabledBtn(false);
            setEmail('');
            setclickedunSubBTN(false);
        }
    }, [subscribe.isSubscribed, clickedunSubBTN])

    return (
        <div className='joinProgram'>
            <div className='joinProgram_cover'>
                <h2 className='joinHeader'> Join Our Program</h2>
                <p className='joinText'> Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua</p>
                <form className='joinForm'>
                    {!subscribe.isSubscribed && (<input className='joinMail' placeholder='E-mail' value={email} type="text" onChange={getEmail} />)}
                    {!subscribe.isSubscribed && (<input className='joinBtns' type="submit" value="SUBSCRIBE" disabled={disabledBtn} onClick={handleSubscribe} />)}
                    {subscribe.isSubscribed && (<button className='joinBtns' type='submit' disabled={disabledBtn} onClick={handleUnsubscribe} >UNSUBSCRIBE</button>)}
                </form>
            </div>
        </div>
    )
}
