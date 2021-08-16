import propTypes from 'prop-types';

export default function Footer ({ caption, username }) {
  
  return (<div className='p-4 pt-4 pb-0'>
    <span className='font-bold mr-1'>{username}</span>
    <span className='font-bold'>{caption}</span>
    
    
    </div>)
}

Footer.propTypes = {
 username: propTypes.string.isRequired,
 caption: propTypes.string
}