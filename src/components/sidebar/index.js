import Suggestions from './suggestions';
import User from './user';
import UseUser from '../../hooks/use-user';

export default function Sidebar() {
  // didnt work for some reason!
  const {
    user: { username, fullName, userId, following, docId = '' } = {},
  } = UseUser();
  // console.log(username, userId, docId);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following}  loggedInUserDocId={docId}/>
    </div>
  );
}
