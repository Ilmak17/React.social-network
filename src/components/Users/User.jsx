import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";

let User = ({user, followingInProgress, unFollow, follow}) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                     alt="img" className={s.userPhoto}/>
                            </NavLink>
                        </div>

                        <div>
                            {user.followed ?
                                <button disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            unFollow(user.id)
                                        }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>Follow</button>
                            }
                        </div>
                    </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
            </span>
        </div>
    )
}

export default User;