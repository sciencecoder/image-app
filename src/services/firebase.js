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
export async function getSuggestions(userId) {
  const followers = await getUserByUserId(userId);
  // get results where username/userId not-in (does not include?) any user in currentUser following
  const result = await firebase.firestore().collection('users').where('userId', '!=', userId).get();
  const userList = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  console.log(userList)
  return userList;
}