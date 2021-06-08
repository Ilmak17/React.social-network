import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/images/img.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, savePhoto, isOwner, status, updateStatus, saveProfile, profileUpdateStatus}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>;
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        if (profileUpdateStatus === true) {
            setEditMode(false);
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={
                    profile.photos.large != null
                        ? profile.photos.large
                        : userPhoto
                } className={s.mainPhoto}/>

                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goEditMode={() => setEditMode(true)}
                                   profile={profile} isOwner={isOwner}/>
                }

                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>

        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>

        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJob}
        </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;