
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export function POST(request) {


  
  const defaultData = [
    {title: "My First Server Cover Letter", content: "This is my first cover letter"},
    {title: "My Second Server Cover Letter", content: "This is my second cover letter"},
    {title: "My Third Server Cover Letter", content: "This is my third cover letter"},
  ];
  return new Response(JSON.stringify({ data: defaultData }));
}
