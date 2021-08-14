import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import propTypes from 'prop-types';
import { getSuggestions, updateUserFollowing } from '../../services/firebase';
import UserContext from '../../context/user';
import SuggestedProfile from './suggested-profile';


export default function Suggestions({userId, loggedInUserDocId, following }) {
  // get user profiles filtered by whether or not it is in current user's followers
  // maybe use as custom hook if I ened to reuse this functionality elsewhere!
  const user = useContext(UserContext);
  const [profiles, setProfiles] = useState([]);
 
  useEffect(() => {
    async function setSuggestionsState() {
      const response = await getSuggestions(user.uid, following);
      setProfiles(response);
    }
    if (user?.uid) {
      // sometimes userId prop is undefined, maaybe because It's from a custom hook, stateful content
      
      setSuggestionsState();
    }
  }, [userId]);
  
 
  return !profiles ? (
    <Skeleton count={1} height={150} clasName="mt-5" />
  ) : (
    <div className="rounded flex flex-col">
      <div className="text-sm items-center justify-between mb-2">
        <p className="font-bold text-gray-50">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-4">
        {profiles.map((profile, i) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUserDocId={profile.docId}
            profileId={profile.userId}
            username={profile.username}
            userId={user.uid}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  );
}

Suggestions.propTypes = {
  userId: propTypes.string,
  loggedInUserDocId: propTypes.string,
  following: propTypes.array,
};
