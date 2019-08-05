import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Quiz {
  uid: string;
  createdAt: Timestamp;
  title: string;
}
