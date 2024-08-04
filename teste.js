import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // ajuste o caminho conforme necessário

async function testFirestore() {
  const querySnapshot = await getDocs(collection(db, "testCollection"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

testFirestore();
