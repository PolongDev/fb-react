import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { Icon } from '@iconify/react';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [cookies, setCookies] = useState<string[]>([]);
  const [reaction, setReaction] = useState<string>(''); 
  const [cookie, setCookie] = useState<string>(""); 
  const [link, setLink] = useState<string>("");

  const handleDeleteCookie = (index: number): void => {
    const updatedCookies = [...cookies];
    updatedCookies.splice(index, 1);
    setCookies(updatedCookies);
    toast("Cookie removed!", {
        description: `Cookie removed successfully.`,
        action: {
          label: "Got it",
          onClick: () => console.log("Got it"),
        },
    });
  };

  const handleCookieAdd = (): void => {
    toast(`${cookie ? "Success!" : "Failed!" }`, {
        description: cookie ? "Your cookie has been added to the list!" : "Failed to add cookie",
        action: {
            label: "Got it",
            onClick: () => console.log("Got it"),
        },
    });
    setCookies([...cookies, cookie]);
    setCookie("");
  };

  const handleSubmit = async (): Promise<void> => {
  try {
    const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
    
    const { data } = await axios.post("https://autoreact-api-ryodev.replit.app/api/react", { link, type: reaction, cookie: randomCookie })
    
    console.log(data);
    toast("Reaction completed!", {
      description: `${JSON.stringify(data)}`,
      action: {
        label: "Got it",
        onClick: () => console.log("Got it"),
      },
    });
  } catch (error: any) {
    console.log(error);
    toast("Failed to react to your post!", {
      description: error.response ? error.message : "Unknown error occurred",
      action: {
        label: "Got it",
        onClick: () => console.log("Got it"),
      },
    });
  }
};

  
  const truncateString = (str: string, maxLength: number): string => { 
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };
  
  return (
    <>
      <main className="w-full h-screen bg-gray-950 poppins-regular">
        <header className="mx-4 py-6">
          <h1 className="font-bold text-3xl text-sky-400">Facebook Reaction Tool</h1>
        </header>
        
        <h1 className="font-medium text-lg text-white mx-4 mt-4">Cookies - {cookies.length}</h1>
        <div className="mx-4">
          <div className="flex justify-center flex-col">
            {cookies.map((cookie, index) => (
              <div key={index} className="mt-4 text-gray-400 bg-gray-800 border-none py-2.5 rounded-md my-2 w-full px-3 text-md flex items-center justify-between">
                <p>{truncateString(cookie, 20)}</p>
                <Button className="text-xl" variant="destructive" onClick={() => handleDeleteCookie(index)}>
                  <Icon icon="material-symbols-light:delete" />
                </Button>
              </div>
            ))}
          </div>
          <Input type="text" placeholder="datr=xxxx;sb=xxxx;vpd=xxxx..." className="mt-4 text-white border-gray-800 border-[1.8px] hover:border-sky-300 focus:border-sky-400 py-5 my-2" value={cookie} onChange={(e) => setCookie(e.target.value)} />
          <Button onClick={handleCookieAdd} className="w-full py-5 text-gray-800 text-md bg-white mt-1 hover:bg-gray-200">Add Cookie</Button>
        </div>
        <h1 className="font-medium text-lg text-white mx-4 mt-8">Configure</h1>
        <div className="mx-4">
          <h1 className="font-medium text-md text-white mt-5">Reaction</h1>
          <Select onValueChange={(value) => setReaction(value)}>
            <SelectTrigger className="w-full border-gray-800 border-[1.8px] text-white py-5 mt-2">
              <SelectValue placeholder="Reaction Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem className="focus:bg-gray-800 text-gray-600 focus:text-white my-1" value="LIKE">Like</SelectItem>
              <SelectItem className="focus:bg-gray-800 text-gray-600 focus:text-white my-1" value="LOVE">Love</SelectItem>
              <SelectItem className="focus:bg-gray-800 text-gray-600 focus:text-white my-1" value="HAHA">Haha</SelectItem>
              <SelectItem className="focus:bg-gray-800 text-gray-600 focus:text-white my-1" value="WOW">Wow</SelectItem>
              <SelectItem className="focus:bg-gray-800 text-gray-600 focus:text-white my-1" value="SAD">Sad</SelectItem>
            </SelectContent>
          </Select>
          <h1 className="font-medium text-md text-white mt-5">Fb Post url/link</h1>
          <Input onChange={(e) => setLink(e.target.value)} type="text" placeholder="https://www.facebook.com/4/posts/xxxxx..." className="mt-4 text-white border-gray-800 border-[1.8px] hover:border-sky-300 focus:border-sky-400 py-5 mt-2"/>
          <Button onClick={handleSubmit} className="w-full py-5 text-white text-md bg-sky-400 mt-1 hover:bg-sky-300 mt-5">Submit Reaction</Button>
        </div>
        
        <p className="text-gray-600 text-sm text-center mt-16 mx-6">Copyright © 2024, FBReactTool - Polong Dev & Kenneth All Rights Reserved.</p>
      </main>
      <Toaster />
    </>
  );
}
