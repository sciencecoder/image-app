import propTypes from 'prop-types';
import { useState, useContext } from 'react';
import UserContext from '../../context/user';
import { firebaseContext } from '../../context/firebase';

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(firebaseContext);
  // const user = useContext(UserContext);
  //  const displayName = user.displayName;
  const { displayName } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComments([{ comment, displayName }, ...comments]);
    setComment('');
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({ comments: FieldValue.arrayUnion({ comment, displayName }) });
  };
  return (
    <div className="p-4 border-t border-grey-primary">
      <form
        className="flex justify-betweens pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length > 0 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          name="add-comment"
          autoComplete="off"
          placeholder="comment..."
          className="w-8/12 py-5 px-4 text-sm bg-gray-50"
          onChange={({target}) => setComment (target.value)}
          ref={commentInput}
        />
         <button
          className={`text-sm font-bold text-blue-medium w-4/12 ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: propTypes.string,
  comments: propTypes.array,
  setComments: propTypes.any,
  commentInput: propTypes.object,
};
