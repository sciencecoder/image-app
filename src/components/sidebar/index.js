import Suggestions from './suggestions';
import User from './user';
import UseUser from '../../hooks/use-user';

export default function Sidebar() {
  // didnt work for some reason!
  const {user: {username, fullName, userId}} = UseUser();
  console.log( 'user Object: ', fullName, userId)

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}