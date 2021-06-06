import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {NavLink} from "react-router-dom";

let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return(
        <div>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && s.selectedPage}
                    onClick={() => {
                        props.onPageChanged(p)
                    }}>
                    {p}
                    </span>
            })}
        </div>
    )
}

export default Paginator;