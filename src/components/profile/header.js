import { useEffect, useState } from 'react';
// use React skeleton
import Skeleton from 'react-loading-skeleton';
import propTypes from 'prop-types';
import UseUser from '../../hooks/use-user';
import { getUserByUserId, toggleFollow } from '../../services/firebase';

export default function Header({
  userProfile: { userId: profileUserId, username: profileUsername, followers=[], following=[], fullName, docId },
  followerCount,
  photosCount,
  setFollowerCount,
}) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const { user } = UseUser();
  const showFollowBtn =
    user.username && user.username !== profileUsername;

  useEffect(() => {
    const isUserFollowingProfile = async () => {
      const isFollowing = (await getUserByUserId(user.userId)) || [];
      setIsFollowingProfile(
        isFollowing.following.indexOf(profileUserId) !== -1
      );
      console.log(user
      )
    };
    if (user.userId && profileUserId) {
      isUserFollowingProfile();
    }
  }, [user]);

 async function handleToggleFollow() {
    setIsFollowingProfile((prevState) => !prevState);
    // I am changing the profile data on setState, but not actually adding followers to firebase
    // I need to updateUserFollowing(user.uid, userId, false);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount-1 : followerCount+1
    });
    await toggleFollow(user.docId, profileUserId, docId, user.userId, isFollowingProfile)
  }
  
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
       {profileUsername ? ( <img
          className="rounded-full w-40 h-40"
          src={`/images/avatars/${profileUsername}.jpg`}
          alt="user"
        />):(
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>

      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className='text-2xl mr-4'>
          {profileUsername}
          </p>
          {showFollowBtn && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            showFollowBtn && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className='container grid grid-cols-3 mt-4 justify-between'>
        <span>
            <b>photos: </b>
            <span>{photosCount}</span>
          </span>
          <span>
            <b>Followers: </b>
            <span>{followerCount}</span>
          </span>
  
         
          <span>
            <b>following: </b>
            <span>{following.length}</span>
          </span>
          </div>
          <div className='container mt-4'>
            <p className='font-medium'>
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
            </p>
          </div>
      </div>

    </div>
  );
}

Header.propTypes = {
  followerCount: propTypes.number.isRequired,
  photosCount: propTypes.number.isRequired,
  setFollowerCount: propTypes.func.isRequired,
  userProfile: propTypes.shape({
    dateCreated: propTypes.number,
    emailAddress: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array.isRequired,
    fullName: propTypes.string,
    userId: propTypes.string,
    username: propTypes.string.isRequired,
    docId: propTypes.string
  }).isRequired,
};
