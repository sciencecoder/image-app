import { useState } from 'react';
import propTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
 
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 1 && (
          <p className="p-4 text-sm text-gray-base cursor-pointer">
            View all {allComments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) =>(
          <p key={`${item.displayName}-${item.comment}`}>
            <Link to={`/p/${item.displayName}`}>
              <span className='font-bold mr-1'>
                {item.displayName}:
              </span>
              <span>{item.comment}</span>
            </Link>
          
          </p>
        ))}
        <div className='text-xs text-grey-base uppercase mt-2'>
          {formatDistance(posted, new Date())} ago
        </div>
      </div>
      <AddComment docId={docId} comments={comments} commentInput={commentInput} setComments={setComments}/>
    </>
  );
}

Comments.propTypes = {
  docId: propTypes.string,
  comments: propTypes.array,
  posted: propTypes.number,
  commentInput: propTypes.object,
};
