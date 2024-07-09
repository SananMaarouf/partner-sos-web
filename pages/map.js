import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useRouter } from 'next/router';
import { db, doc, getDoc, auth, signInAnonymously } from '../utils/firestore';
import { MapBoxComponent } from '../components/mapBoxComponent';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const router = useRouter();
  let [documentData, setDocumentData] = useState({});
  let [user, setUser] = useState(null); // [2]
  let [partner, setPartner] = useState(null); // [3
  let [expiresAt, setExpiresAt] = useState(null); // [3 ]
  let [location, setLocation] = useState(null); // [longitude, latitude]

  // Function to fetch session data
  async function fetchSessionData(docId) {
    const docRef = doc(db, "sessionTokens", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Fetched session data:", data);
      return data; // Return the session data
    } else {
      throw new Error("No such document!");
    }
  }

  // Function to fetch user data
  async function fetchUserData(userId) {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData; // Return the user data
    } else {
      throw new Error("No such user document!");
    }
  }

  useEffect(() => {
      let fetchInterval;
  
      const signInAnonymouslyHandler = async () => {
        const { t: docId } = router.query;
        if (docId) {
          try {
            const userCredential = await signInAnonymously(auth);
            // Fetch session data
            const { expiresAt, userId } = await fetchSessionData(docId);
            setUser(userId);
            setExpiresAt(expiresAt);
  
            const expirationDate = new Date(expiresAt);
            if (new Date() < expirationDate) {
              // Fetch user data immediately
              const userData = await fetchUserData(userId);
              console.log("Fetched user data:", userData);
              // Update location and partner username after fetching user data
              const { location: { longitude, latitude }, username } = userData;
              setLocation([longitude, latitude]);
              setPartner(username);
              
              // Set up an interval to fetch user data every minute
              fetchInterval = setInterval(async () => {
                if (new Date() < expirationDate) {
                  const userData = await fetchUserData(userId);
                  console.log("Fetched user data:", userData);
                  // Update location and partner username after fetching user data
                  const { location: { longitude, latitude }, username } = userData;
                  setLocation([longitude, latitude]);
                  setPartner(username);
                } else {
                  clearInterval(fetchInterval);
                  console.log("Session expired.");
                }
                // i could fetch more often but i'm tryna save on db reads
              }, 60000); // 60000 milliseconds = 1 minute
            } else {
              console.log("Session expired.");
            }
          } catch (error) {
            console.error(
              "Error during the sign-in or data fetching process:", error
            );
          }
        }
      };
  
      signInAnonymouslyHandler();
  
      // Cleanup on component unmount
      return () => {
        if (fetchInterval) {
          clearInterval(fetchInterval);
        }
      };
  }, [router.query]); // Depend on `router.query` to re-run the effect when it changes


  const navigateToLocation = () => {
    const [longitude, latitude] = location;
    // Adding travelmode=transit to the URL
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=transit`;
    window.open(url, '_blank');
  };


  return (
    <section className='flex flex-col h-[100vh] items-center text-center mx-auto bg-gray-950 px-2 '>
      <h1 className='text-2xl my-2'>Your partner {partner} has alerted you that they are feeling unsafe</h1>
      <h1 className=''>Here is their location on the map</h1>
      <section className='w-full max-w-2xl'>
        <MapBoxComponent location={location} />
        <button onClick={navigateToLocation} className="navigate-button text-lg bg-blue-500 rounded-lg text-white px-5 py-2 mt-3">
          Open in Google Maps
        </button>
      </section>
    </section>
  );
};

export default Map;