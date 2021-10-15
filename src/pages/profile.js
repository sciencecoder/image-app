import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';
import UserContext from '../context/user';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  // get user dat , display it!
  // show skeleton,
  const { username } = useParams();
  const history = useHistory();
  const [userExists, setUserExists] = useState();
  const [userProfile, setUserProfile] = useState();
  // maybe refactor to pass down followProfile function, and update state or fire useEffect when a user follows a profile?
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user) {
        setUserExists(true);
        setUserProfile(user);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
     
    }
    checkUserExists();
  }, [username]);
 
  return userProfile?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile userProfile={userProfile} />
      </div>
    </div>
  ) : null;
}
