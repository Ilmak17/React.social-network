import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       placeholder={"Post Message"}
                       name={"newPostElement"}
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({form: 'profileAddPostForm'})(AddNewPostForm);

const MyPosts = React.memo(
    (props) => {
        let postsElements = props.posts
            .map(p => <Post key={p.id} message={p.message} like={p.likesCount}/>);

        const onAddPost = (values) => {
            props.addPost(values.newPostElement);
        }

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <div>
                    <AddPostReduxForm onSubmit={onAddPost}/>
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )
    }
);

export default MyPosts;