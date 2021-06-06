import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";

let Users = (props) => {

    return (
        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     alt="img" className={s.userPhoto}/>
                            </NavLink>
                        </div>

                        <div>
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.unFollow(u.id)
                                        }}>Unfollow</button>


                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)

                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
            }
        </div>
    )
}

export default Users;