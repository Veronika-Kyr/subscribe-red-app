import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import "./UserPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIdUser } from './idUserSlice';


export function UserPage() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchIdUser(id))
    }, [dispatch])

    if (user.onIDdata && user.fetchStatus !== 'error') {
        return (
            <div>
                <div className='navigation'>
                    <p><Link to='/'>Main</Link> </p>
                    <p><Link to='/community'>Community</Link> </p>
                </div>
                <div className='userCardonID'>
                    <img className='userImage' src={user.onIDdata.avatar} alt='photography of user' />
                    <p className='userCitate'>{user.onIDdata.citate}</p>
                    <h4>{user.onIDdata.firstName}  {user.onIDdata.lastName}</h4>
                    <h5> {user.onIDdata.position}</h5>
                </div>
            </div>
        )
    }
    else { navigate("*") }
}
