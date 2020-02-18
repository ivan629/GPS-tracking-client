import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: 'AAAAn_PxK2g:APA91bGJgtCSuh3JGGrlp45GXEv18H9fg-HlV8pIUm4ZQl2S6vwFj0-74bknykjLkKR2OMX7IZnqnVqcfj4FFuwDlLwfSQ0EVGcA5p2DhTlroduFsEa7snatwyJrTap3EuBCt2EaZMi5',
  databaseURL: "https://gps-tracking-29fa5.firebaseio.com/",
  projectId: "gps-tracking-29fa5",
  storageBucket: "gps-tracking-29fa5.appspot.com"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
