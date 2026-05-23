"use client";

import "@/app/globals.scss";
import axios from "axios";
import { useState } from "react";

export default function chatbotPage(){
    type msg = {
        id:number,
        question:string,
        answer:string
    }
    const [ff,setF] = useState<File | null>(null);
    const [res,setRes] = useState<msg[]>([]);
    const [qs,setQs]= useState("");
    

    const askai = async()=>{
        const res = await axios.post("http://127.0.0.1:8000/askai",{qst:qs});

        setRes(res.data);
        console.log(res);
    }
    return(
        <div className="cpWholePage">
            <div className="header">RAG-based CHATBOT</div>
            <div className="chatBody">
            
            {
                res.map((msg)=>{
                    return (<>
                    <div  className="Qs">{msg.question}</div>
                    <div className="Ans">{msg.answer}</div>
                    </>

                    );
                })
            }
            </div>
            <div className="footer">
                
            <div className="chatEnter">
                <input placeholder=" Ask here " className="enterchat" onChange={(e)=>{setQs(e.target.value)}} ></input>
            <button className="chatEnterButton" onClick={askai}>Ask</button>
            </div>
            </div>
            </div>
            
       
    );
}