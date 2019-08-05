import React, { Component } from "react";
import { db} from '../firebase';
export class IndexPage extends Component {

  quizzesRef = db.collection('quizzes');

  test() {
    this.quizzesRef.get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
  };

  render() {
    this.test();
    return <div>
      Index
    </div>
  }
}



