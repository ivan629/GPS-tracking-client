import { has, map } from 'lodash';
import { db } from '../../config/db';
import store from "../store";
import { UNIQUE_USER_ID_SET, USERS_DATA_SET } from "../actions/locationDetectionActions";

class FirebaseService {
  constructor() {
    this.userRef = db.ref('/users');
  }

  get uniqueUserId() {
    return store.getState().locationMonitoring.uniqueUserId;
  }

  async getAllUsers() {
    const users = await this.userRef.once('value');

    return users.val();
  }

  async handlePositionSet (item) {
    const allUsers = await this.getAllUsers();
    const isInitialUserLogin = has(allUsers, this.uniqueUserId);

    if (isInitialUserLogin) {
      this.userRef.child(this.uniqueUserId).update(item);
      const usersData = map(allUsers, userData => userData);
      store.dispatch({ type: USERS_DATA_SET, payload: usersData })
    } else {
      this.userRef.push(item).then((snap) => store.dispatch({ type: UNIQUE_USER_ID_SET, payload: snap.key }));
    }
  };

  clearCurrentUserPositionHistory () {
    this.userRef.child(this.uniqueUserId).remove();
  };
}

export const firebaseService = new FirebaseService();
