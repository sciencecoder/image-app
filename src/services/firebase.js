import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  // console.log(result);
  window.cData = result;
  return result.docs.map((user) => user.data().length > 0).length > 0;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  // result.docs.map((item) => console.log(item));
  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  // result.docs.map((item) => console.log(item));
  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
export async function getUserPhotosByUsername(username) {
  const {userId} = await getUserByUsername(username);
  const result = await firebase.firestore().collection('photos').where('userId', '==', userId).get();
  const photos = result.docs.map((photo) => ({
   ...photo.data(),
   docId: photo.id
  }))
  return photos;
}
export async function getSuggestions(userId, following = []) {
  
  // get results where username/userId not-in (does not include?) any user in currentUser following
  const result = await firebase.firestore().collection('users').where('userId', '!=', userId).limit(10).get();
  const userList = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
   .filter((profile) => !following.includes(profile.userId) );
  // console.log(userList)
  return userList;
}
// need to rename this
export async function getImagePosts (following) {
  // I think the shape of the photo data could be refactored so that all photos by same user are under the same collection/document
  const response = await firebase.firestore().collection('photos').where('userId', 'in', following).get().catch((err) => {
    console.error(err);
  });
  const results = response.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }))
const photosWithUsername =await Promise.all(
  results.map(async (item) => { 
    const {username} = await getUserByUserId(item.userId);
    return {
      ...item, 
      username
    };
  }))
  
  
     

console.log(photosWithUsername)
  return photosWithUsername;
}
export async function updateUserFollowing(loggedInUserDocId, followedUserId, isfollowing) {
  
  const result = await firebase.firestore().collection('users').doc(loggedInUserDocId)
  // .update() did not work for me, had to use .set()
  .update({following: isfollowing ? FieldValue.arrayRemove(followedUserId) : FieldValue.arrayUnion(followedUserId)})
  .then(() => {
    console.log('success')
  })
  .catch(() => {
    console.log('error caught')
  })
 

}
export async function updateFollowedUserFollowers(userId, followedUserId, isfollowing) {
  firebase.firestore().collection('users').doc(followedUserId)
  .update({followers: isfollowing ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)})
  .then(() => {
    console.log('success')
  })
  .catch(() => {
    console.log('error caught')
  })
}
export async function toggleFollow(loggedInUserDocId, followedUserId, followedUserDocId, loggedInUserId, isFollowing) {
  await updateUserFollowing(loggedInUserDocId, followedUserId, isFollowing);
  await updateFollowedUserFollowers( loggedInUserId, followedUserDocId, isFollowing);
} 