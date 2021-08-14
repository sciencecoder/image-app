import { Link } from 'react-router-dom'
import propTypes from 'prop-types';

export default function Header({username}) {

 return (
   <div className='flex h-4 p-4 py-8 border-b brder-grey-primary'>
     <div className='flex items-center'>
       <Link to='/anywhere' className='flex items-center'>
        <img className='h-8 w-8 flex mr-3 rounded-full '
        src={`images/avatars/${username}.jpg` }
        alt=''
        />
       </Link>
       <p className='font-bold'>{username}</p>
     </div>
   </div>
 )
}

Header.propTypes = {
  username: propTypes.string
}