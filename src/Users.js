import React, { useEffect } from 'react';
import "./BigCommunity.css";
import { fetchUsers } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


export default function Users() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    let location = useLocation();
    console.log(location);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (users.data) {
        return (
            <div className='sectionCards'>

                {users.data.map((userr, index) => {
                    return (
                        <div key={index} className='userCard'>
                            <img className='userImage' src={userr.avatar} alt='photography of user' />
                            <p className='userCitate'>{userr.citate}</p>
                            <h4><Link to={`${userr.id}`}>{userr.firstName}  {userr.lastName}</Link></h4>
                            <h5> {userr.position}</h5>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
