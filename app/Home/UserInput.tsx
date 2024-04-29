import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '@/app/firebase'
import { toast } from "@/components/ui/use-toast"

const user = auth.currentUser;
const uid = user?.uid;

async function fetchResult(t: string): Promise<any> {
  try {
    const data = await fetch(`http://127.0.0.1:5000/${t}`);
    const res = await data.json();
    return res.prediction;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function AddBus() {
  const [tweet, setTweet] = React.useState(' ');
  const [m, setM] = React.useState('');

  function handleSubmit() {
    if (tweet == ' ') {
      toast({
        title: 'Enter Tweet',
      })
    }
    fetchResult(tweet)
  .then(title => {
    if (title !== null && title !== undefined) {
      toast({
        title: title
      });
        try {
        const docRef = addDoc(collection(db, "UserInput"), {
          tweet: tweet,
          prediction: title,
          userID: uid,
        }
        )
  
        
        setTweet(' ');
      } catch (error) {
  
      }
    } else {
      toast({
        title: 'Error fetching data'
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    toast({
      title: 'Error fetching data'
    });
  });


  }

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/img/x-icon.jpeg')] bg-cover bg-[#1c9be9]">
      <div className="flex items-center justify-center">
        <Card className="w-[750px] ">
          <CardHeader>
            <CardTitle className="text-3xl">Fake Tweet Detector</CardTitle>
            <CardDescription>Enter Your Tweet</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">

                  <Input id="name" value={tweet} onChange={(e) => setTweet(e.target.value)} placeholder="Your Tweet" />
                </div>

              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}
export default AddBus