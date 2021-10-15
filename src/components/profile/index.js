import { useEffect, useReducer } from 'react';
import propTypes from 'prop-types';
import { getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

export default function UserProfile({userProfile}) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(userProfile.username);
      dispatch({
        profile: userProfile,
        photosCollection: photos,
        followerCount: userProfile.followers.length,
      });
    }
    if (userProfile.username) {
      getProfileInfoAndPhotos();
    }
  }, [userProfile.username]);

  return (
    <div className=' w-8/12 mx-auto py-4 bg-white flex flex-col'> 
      <Header photosCount={photosCollection ? photosCollection.length : 0} followerCount={followerCount} setFollowerCount={dispatch} userProfile={userProfile}/>
      <Photos photos={photosCollection} />
    </div>
  );
}

UserProfile.propTypes = {
  userProfile: propTypes.shape({
    dateCreated: propTypes.number,
    emailAddress: propTypes.string,
    followers: propTypes.array,
    fullName: propTypes.string,
    userId: propTypes.string,
    username: propTypes.string.isRequired,
  }),
};
