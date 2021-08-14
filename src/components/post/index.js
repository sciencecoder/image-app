import {useRef} from 'react';
import propTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';

export default function TimeLinePost({ content }) {

  console.log(content.imageSrc);
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();

  }
  return (
    
      <div className ='col-span-4 border-grey-primary border-bg-white mb-16'>
        <Header username={content.username} />
        <Image caption={content.caption} imageSrc={content.imageSrc}/>
        <Actions docId={content.docId} totalLikes={content.likes} handleFocus={handleFocus} />
      <div>
        <div>
          <p>a comment</p>
          <span>icoons, likes, all that good stuff</span>
        </div>
      </div>
      </div>
     

  );
}

TimeLinePost.propTypes = {
  content: propTypes.shape({
    username: propTypes.string.isRequired,
    imageSrc: propTypes.string.isRequired,
    caption: propTypes.string,
   // userLikedPhoto: propTypes.bool,
    likes: propTypes.array,
    comments: propTypes.array,
    dateCreated: propTypes.number,
    docId: propTypes.string
  }),
};
