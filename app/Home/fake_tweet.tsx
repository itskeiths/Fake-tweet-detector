'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

const user = auth.currentUser;
const uid = user?.uid;

async function getTweets(): Promise<string[]> {
  try {
    const q = query(collection(db, 'UserInput'), where("userID", "==", uid));
    const seatsSnapshot = await getDocs(q);
    return seatsSnapshot.docs.map(doc => doc.data().tweet);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

function isNegativeTweet(tweet: string): boolean {
  const negativeWords = [
    "bad",
    "terrible",
    "horrible",
    "awful",
    "negative",
    "hate",
    "dislike",
    "worst",
    "disgusting",
    "unhappy",
    "sad",
    "depressed",
    "miserable",
    "frustrated",
    "angry",
    "annoyed",
    "upset",
    "stressed",
    "disappointed",
    "regret",
    "failure",
    "disaster",
    "defeat",
    "unfortunate",
    "distress",
    "grief",
    "sorrow",
    "despair",
    "doom",
    "pain",
    "agony",
    "hurt",
    "trauma",
    "torment",
    "suffering",
    "anguish",
    "heartbreak",
    "misery",
    "melancholy",
    "despondent",
    "gloomy",
    "hopeless",
    "dismal",
    "bleak",
    "morose",
    "forlorn",
    "crestfallen",
    "disheartened",
    "discouraged",
    "demoralized",
    "defeated",
    "broken-hearted",
    "crushed",
    "downcast",
    "blue",
    "somber",
    "doleful",
    "lugubrious",
    "woeful",
    "rueful",
    "heartrending",
    "pained",
    "heavy-hearted",
    "funereal",
    "sepulchral",
    "grave",
    "glum",
    "low",
    "down",
    "dispirited",
    "pessimistic",
    "defeatist",
    "resigned",
    "desolate",
    "dolorous",
    "tearful",
    "heartbroken",
    "weepy",
    "sullen",
    "cheerless",
    "dreary",
    "dark",
    "bleak",
    "dire",
    "mournful",
    "tragic",
    "lugubrious",
    "sorrowful",
    "disconsolate",
    "bereaved",
    "grief-stricken",
    "inconsolable",
    "shattered",
    "crestfallen",
    "not good",
  ];
  
  return negativeWords.some(word => tweet.toLowerCase().includes(word));
}

function Fake() {
  const [tweets, setTweets] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedTweets: string[] = await getTweets();
      setTweets(fetchedTweets);
    }
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/img/x-icon.jpeg')] bg-cover bg-[#1c9be9]">
      <div className="flex flex-wrap justify-center">
        {tweets.map((tweet, index) => (
          <Card key={index} className="w-[750px] mb-4">
            <CardHeader>
              <CardTitle>Review about your Tweet</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{tweet}</CardDescription>
              {isNegativeTweet(tweet) ? <Label style={{ color: 'red' }}>❌ Fake Tweet</Label> : <Label>😊 Genuine Tweet</Label>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Fake;
