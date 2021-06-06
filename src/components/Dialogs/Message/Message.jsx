import React from "react";
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return <div className={s.dialog}>
        <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>{props.name}</NavLink>
    </div>
}

const Message = (props) => {
    return <div className={s.messages}>{props.message}</div>
}

const Dialogs = () => {

    let dialogs = [
        {id: 1, name: "Dima",},
        {id: 2, name: "Andrew"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ];

    let dialogsElements = dialogs
        .map( d => <DialogItem name={d.name} id={d.id}/>);


    let messages = [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
    ];

    let messagesElements = messages
        .map( m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;