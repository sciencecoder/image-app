import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import UseUser from '../hooks/use-user';
import TimeLinePost from './post';
import { getImagePosts } from '../services/firebase';
// import UserContext from '../../context/user';

export default function TimeLine() {
 
  const { user: {following} } = UseUser();
  const [photos, setPhotos] = useState(null);
  // use Custom hook if the functionality is reused, use simple useffect if it is a lifecycle/ sideffect hook for just one component,
  // if needed else where, refactor the code
  useEffect(() => {
    async function getPosts() {
      // console.log('attempting to get posts');
      if(following?.length > 0) {
        const posts =  await getImagePosts(following);
        posts.sort((a, b) => a.dateCreated-b.dateCreated)
        setPhotos(posts);
      }
     
    }
    getPosts();
  }, [following]);


  return (
    <div className="p-4 bg-white">
      <span className="justify-items-center text-center">
      <p>timeline</p>
      </span>
     <div>
       {// underscore indiates this argument is not used. binary experssion && content is shorter, simpler than ternary soemtimes
       photos === null ? 
       (<>
       {[...new Array(4)].map((_, index) => <Skeleton key={index} count={1} height={320} width ={350} />)}
        </>) : 
         (<>
          {photos?.length > 0 &&  photos.map((content, index) => (<TimeLinePost key ={index} content={content} />))}
          {photos.length === 0 && (<p>Follow some users to see a customized timeline</p>)}
          
          
          </>)

       }  
     </div>
    </div>
  );
}
