"use client";

import { useState } from "react";
import axios from "axios";
 import "@/app/globals.scss";

export default function ragchatbot(){
    type msg = {
        id:number;
        question:string;
        answer:string;
    }
    const [ff,setF] = useState<File | null>(null);
    const [res,setRes] = useState<msg[]>([]);
    const [qs,setQs]= useState("");
    const sendAi = async()=>{
        if (!ff) return;
        const form = new FormData();
        form.append("file",ff);
        const res = await axios.post("http://127.0.0.1:8000/rgchat",form);
        
    }

    const askai = async()=>{
        const res = await axios.post("http://127.0.0.1:8000/askragai",{qst:qs});

        setRes(res.data);
        console.log(res);
    }
    return(
        <div className="rcpWholeBody">
            
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
            <div className="fileEnter"><input type="file" onChange={(e)=>{setF(e.target.files?.[0] || null)}}></input>
            <button onClick={sendAi}>Enter</button></div>
            <div className="chatEnter">
                
            <input placeholder=" Ask here " className="enterchat" onChange={(e)=>{setQs(e.target.value)}} ></input>
            <button className="chatEnterButton" onClick={askai}>Ask</button>
            </div>
            </div>
            

            
        </div>
    );
}