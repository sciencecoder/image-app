import { useContext } from 'react';
import UseUser from '../../hooks/use-user';

// import UserContext from '../../context/user';

export default function TimeLine() {
  // const userCntxt = useContext(UserContext);
  // console.log(userCntxt);
  // use User does not work!
  const { user } = UseUser();
  // console.log(user);
  return (
    <div className="p-4">
      {/* <User />
    <Suggestions /> */}
    </div>
  );
}
