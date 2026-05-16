"use client";
import Image from "next/image";
import "./globals.scss";
import Link from "next/link"
import {  useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter(); 
  const goP1 = ()=>{
    router.push("/chatbotPage");
  }
  const goP2 =()=>{
    router.push("/ragchatbot")
  }
  return (
    <div className="wholeBody">
      <div className="header">Welcome to D's Chatbot</div>
      <div className="body">
        <button onClick={goP1}>ChatBot</button>
        <button onClick={goP2}>RAG-ChatBot</button>
      </div>
      <div className="footer"><p>&copy; Dhanushvardan.All rights reserved</p></div>
    </div>
  );
}
