import { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { firebaseContext } from '../../context/firebase';
import UserContext from '../../context/user';
import Comments from './comments';

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
  const { uid: userId } = useContext(UserContext);
  console.log(userId);
  const [likes, setLikes] = useState(totalLikes || 0);
  const [toggleLiked, setToggleLiked] = useState(false);
  const { firebase, FieldValue } = useContext(firebaseContext);
  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };
  return (
    <div className="flex justify-between p-4">
      <div className="flex">
        <svg
          onKeyDown={(event) =>
            event.key === 'Enter' ? handleToggleLiked() : false
          }
          onClick={handleToggleLiked}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 cursor-pointer select-none ${
            toggleLiked ? 'fill-red text-red-primary' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 select-none cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          />
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <div className='p-4 py-0'>
        <p>{likes === 1 ? `${likes} Like` : `${likes} Likes`}</p>
      </div>
    </div>
  );
}

Actions.propTypes = {
  docId: propTypes.string,
  totalLikes: propTypes.number.isRequired,
  likedPhoto: propTypes.bool,
  handleFocus: propTypes.func.isRequired,
};
