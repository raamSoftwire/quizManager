import firebase from "firebase";
import { Question } from "./question";

export interface Quiz {
  uid: string;
  createdAt: firebase.firestore.Timestamp;
  title: string;
  questions?: Question[];
}
