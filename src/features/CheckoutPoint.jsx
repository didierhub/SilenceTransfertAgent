import {Auth,db} from '../firebase/FireBaseConfig'
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import UserHook from '../hooks/UserHook'


export async function createCheckoutSession() {
    const {user}=UserHook()

    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
        const docRef = await addDoc(collection(db, 'customers', user.uid, 'checkout_sessions'), {
          price: 'price_1GqIC8HYgolSBA35zoTTN2Zl',
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        });
    
        onSnapshot(docRef, (snap) => {
          const data = snap.data();
          const { error, url } = data || {};
    
          if (error) {
            alert(`An error occurred: ${error.message}`);
          } else if (url) {
            window.location.assign(url);
          }
        });
      } catch (error) {
        console.error("Error creating checkout session: ", error);
        alert("Failed to create checkout session.");
      }
}


