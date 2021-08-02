import { useContext, useEffect, useState } from 'react';
import { getSuggestions } from '../../services/firebase';
import UserContext from '../../context/user';

export default function Suggestions() {
  // get user profiles filtered by whether or not it is in current user's followers
  // maybe use as custom hook if I ened to reuse this functionality elsewhere!
  const user = useContext(UserContext);
  const [suggestions, setSuggestions] = useState({});
  useEffect(() => {
    async function setSuggestionsState() {
      const response = await getSuggestions(user.uid);
      setSuggestions(response);
    }
    if (user?.uid) {
      setSuggestionsState();
    }
  }, [])
  console.log(suggestions);
  return <div>
    
    <div className="text-center justify-items-center">Suggestions</div>
    </div>;
}
