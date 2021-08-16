import { useRef } from 'react';
import propTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function TimeLinePost({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();
  };
  return (
    <div className="col-span-4 border-grey-primary border-bg-white mb-16">
      <Header username={content.username} />
      <Image caption={content.caption} imageSrc={content.imageSrc} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments || []}
        commentInput={commentInput}
        posted={content.dateCreated}
      />
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
    docId: propTypes.string,
  }),
};
