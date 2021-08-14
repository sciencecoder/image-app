import { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {  updateUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({
  suggestedUserDocId,
  profileId,
  username,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollow() {
    setFollowed(!followed)
     await updateUserFollowing(loggedInUserDocId, profileId, followed);
     await updateFollowedUserFollowers(userId, suggestedUserDocId, !followed);
    
  }
  
  return !followed ? (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
      
      <Link to={`/p/${username}`}>
        <p className="font-bold text-sm">{username}</p>
      </Link>
      </div>
      <div>
        <button type='button' className='text-bold text-blue-medium p-1' onClick={handleFollow}>
          {followed ? 'unFollow' : 'Follow'}
        </button>
      </div>
    </div>
    
  ) : ('');
}

SuggestedProfile.propTypes = {
  suggestedUserDocId: propTypes.string,
  profileId: propTypes.string,
  username: propTypes.string,
  loggedInUserDocId: propTypes.string,
  userId: propTypes.string,
};
