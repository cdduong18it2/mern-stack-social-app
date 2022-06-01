import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { getProfileUsers } from '../../redux/actions/profileAction';
import Avatar from '../Avatar';
import FollowBtn from '../FollowBtn';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';



const Info = () => {
    const { id } = useParams();
    const { auth, profile } = useSelector(state => state);
    
    const dispatch = useDispatch();

    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if(id === auth.user._id) {
            setUserData([auth.user])
        }
        else {
            dispatch(getProfileUsers({users: profile.users, id, auth}));
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, onEdit, dispatch]);

    
    return (
        <div className="info">
            {
                userData.map(user => (
               <div className="info_container" key={user._id}>
               <Avatar src={user.avatar} size="supper-avatar"/>

               <div className="info_content">
                   <div className="info_content_title">
                       <h2>{user.username}</h2>
                       {
                           user._id === auth.user._id
                         ? <button className="btn btn-outline-info"
                       onClick={() => setOnEdit(true)}>
                           Edit Profile
                       </button>
                       : <FollowBtn user={user}/>
                       }
                       
                   </div>

                   <div className="follow_btn">
                       <span className="mr-4" onClick={() => setShowFollowers(true)}>
                           {user.followers.length} Followers
                       </span>

                       <span className="mr-4" onClick={() => setShowFollowing(true)}>
                           {user.following.length} Following
                       </span>
                   </div>

                   <h6>{user.fullname} {user.mobile}</h6>
                   <p className="m-0">{user.address}</p>
                   <h6>{user.email}</h6>
                   <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a>
                    
               </div>
               {
                        onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />
                    }

                    {
                        showFollowers && 
                        <Followers users={user.followers} setShowFollowers={setShowFollowers}/>
                    }
                    
                    {
                        showFollowing && 
                        <Following users={user.following} setShowFollowing={setShowFollowing}/>
                    }
               </div>

                ))
            }
           
        </div>
    )
}

export default Info
