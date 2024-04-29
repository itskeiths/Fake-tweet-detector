'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ScrollArea } from "@/components/ui/scroll-area"

const user = auth.currentUser;
const uid = user?.uid;

async function getTweets(): Promise<{ tweet: string; prediction: string }[]> {
  try {
    const q = query(collection(db, 'UserInput'), where("userID", "==", uid));
    const userInputSnapshot = await getDocs(q);
    return userInputSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          tweet: data.tweet,
          prediction: data.prediction
      };
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}


function Fake() {

  const [tweets, setTweets] = useState<{ tweet: string; prediction: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedTweets = await getTweets();
      setTweets(fetchedTweets);
    }
    fetchData();
  }, []);


  return (
    <div className="flex justify-center items-center h-screen bg-[url('/img/x-icon.jpeg')] bg-cover bg-[#1c9be9]">
      
      <div className="flex flex-wrap justify-center">
      <ScrollArea className="h-72 w-90 rounded-md border">
        {tweets.map((tweetObj, index) => (
          <Card key={index} className="w-[750px] mb-4">
            <CardHeader>
              <CardTitle>Review about your Tweet</CardTitle>
            </CardHeader>
            <CardContent>
  <CardDescription>{tweetObj.tweet}</CardDescription>

  {(() => {
    let labelColor;
    let labelText;

    if (tweetObj.prediction === 'Real') {
      labelColor = 'green';
      labelText = '😊 Genuine Tweet';
    } else if (tweetObj.prediction === 'May be fake') {
      labelColor = 'red';
      labelText = '❌ May be Fake Tweet';
    } else if (tweetObj.prediction === 'General Fact') {
      labelColor = 'orange';
      labelText = '💡 General Fact';
    } else if (tweetObj.prediction === 'Entity Not Found') {
      labelColor = 'blue';
      labelText = '❓ Entity Not Found';
    } else {
      // Handle any other cases here
      labelColor = 'black';
      labelText = 'Unknown Prediction';
    }

    return (
      <Label style={{ color: labelColor }}>{labelText}</Label>
    );
  })()}
</CardContent>

          </Card>
        ))}
        </ScrollArea>
      </div>
      
    </div>
  );
}

// Export the component
export default Fake;
