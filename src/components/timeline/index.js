import { useContext } from 'react';
import UseUser from '../../hooks/use-user';

// import UserContext from '../../context/user';

export default function TimeLine() {
 
  const { user } = UseUser();
  return (
    <div className="p-4 ">
      <span className="justify-items-center text-center">
      <p>timeline</p>
      </span>
     
    </div>
  );
}
