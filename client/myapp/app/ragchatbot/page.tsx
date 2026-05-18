"use client";

import { useState } from "react";
import axios from "axios";

export default function ragchatbot(){
    const [ff,setF] = useState<File | null>(null);
    const [res,setRes] = useState("");
    const [qs,setQs]= useState("");
    const sendAi = async()=>{
        if (!ff) return;
        const form = new FormData();
        form.append("file",ff);
        const res = await axios.post("http://127.0.0.1:8000/rgchat",form);
        
    }

    const askai = async()=>{
        const res = await axios.post("http://127.0.0.1:8000/askragai",{"qs":qs});

        setRes(res.data);
    }
    return(
        <div className="rcpWholeBody">
            <input type="file" onChange={(e)=>{setF(e.target.files?.[0] || null)}}></input>
            <button onClick={sendAi}>Enter</button>
            <label>Ask here</label>
            <input onChange={(e)=>{setQs(e.target.value)}} ></input>
            <button onClick={askai}>Ask</button>
            {res}
        </div>
    );
}