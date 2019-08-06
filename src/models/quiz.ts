import firebase from "firebase";

export interface Quiz {
  uid: string;
  createdAt: firebase.firestore.Timestamp;
  title: string;
}
