import React, { useEffect } from 'react';
import "./BigCommunity.css";
import { fetchUsers } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Users() {
    // const [userdata, setuserData] = useState(null);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers('http://localhost:3000/community'))
    }, [dispatch])

    // useEffect(() => {
    //     fetch('http://localhost:3000/community')
    //         .then((resp) => resp.json())
    //         .then((setuserData))
    // }, []);
    if (users.data) {
        return (
            <div className='sectionCards'>

                {users.data.map((user, index) => {
                    return (
                        <div key={index} className='userCard'>
                            <img className='userImage' src={user.avatar} alt='photography of user' />
                            <p className='userCitate'>{user.citate}</p>
                            <h4> {user.firstName}  {user.lastName}</h4>
                            <h5> {user.position}</h5>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}