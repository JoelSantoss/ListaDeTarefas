import { initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCnlvrOV0naZu5tfKCN6pKaXN6y14mBrxc",
    authDomain: "cursoudemy-d43b3.firebaseapp.com",
    projectId: "cursoudemy-d43b3",
    storageBucket: "cursoudemy-d43b3.appspot.com",
    messagingSenderId: "878177910765",
    appId: "1:878177910765:web:d2e1d0880f57da8e4971e4",
    measurementId: "G-5K5JJQG2GE"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export {db, auth}