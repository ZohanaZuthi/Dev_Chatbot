import {useState,useEffect,useRef } from "react"


function Chat() {
     const[isChatOpen,setIsChatOpen]=useState(false)
     const [messages,setMessages]=useState([]);
     const [text,setText]=useState("")
     const ref=useRef(null);
     useEffect(()=>{
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  },[messages]);

    // for loading the history so when the chat is open the history call it self
    useEffect(()=>{
      if(!isChatOpen) return;

      fetch("http://127.0.0.1:8000/api/history")
      .then(res=>res.json())
      .then(data=>setMessages(data.messages||[]));
    },[isChatOpen]);
    const sendMessage=async()=>{
    if(!text.trim()) return
    
    const date=new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });

    setMessages(prev=>[
      ...prev,
      {
        sender:"user",
        text:text,
        time:date,
      },
    ]);
    



    const res = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: data.response,
        time:date,
      },
    ]);

    setText("");


  };

  return (
   <>
    <div className="relative w-full h-screen bg-white flex">
      <div className="flex w-full object-container justify-center z-0"><img src='./Group_3.png' alt='Background' className=" max-w-full h-full z-0"></img></div>
      <div className="absolute flex left-[120px] z-10 gap-12 top-1/2 -translate-y-1/2 items-center">
      <div>
        <div className="text-9xl text-violet-800 font-bold " >Live<br/> Chat</div>
        <p className="text-2xl text-violet-800 font-bold "> Component</p>
        </div>
        
        
        <div className="relative max-w-full h-full cursor-pointer"onClick={()=>setIsChatOpen(true)} >
          <img src='./Ellipse.png' alt='Background' className=" z-0 "></img>
        <img src='./Logo.png' alt='Background' className="absolute inset-0 m-auto z-10"></img>
        </div>
      </div>
      
      {isChatOpen&&(<div className="fixed bottom-6 right-6 w-[360px] h-[620px] bg-white mr-5 md:mr-24 shadow-2xl rounded-2xl z-50 flex flex-col overflow-hidden">
      
      <div className="flex p-3 bg-blue-500 gap-3 text-white font-bold text-xl rounded-t-2xl">
       <div ><img src='./Logo.png' className="h-12 w-12"></img></div> 
       <div className="flex flex-1 flex-col"> Main Title<br/> <span className="text-green-400 text-sm">● Online</span></div>
       <div onClick={()=>setIsChatOpen(false)} className="text-xl cursor-pointer">X</div>
       </div>
       
       <div className="flex flex-col h-full overflow-hidden">
       <div className="flex-1  p-3 overflow-y-auto space-y-3  bg-white">
      {messages.map((msg, index) =>
        msg.sender === "user" ? (
          <div key={index} className="ml-auto max-w-[75%] bg-blue-500 text-black p-3 rounded-2xl">
            <div className="text-sm whitespace-pre-wrap break-words">{msg.text} </div>
        <div  className="text-xs opacity-60 mt-1 text-right">{msg.time}</div>
    </div>) 
          
    : (
       <div>
      <div  key={index} className="flex flex-col max-w-[75%] bg-gray-300 text-black p-3 rounded-2xl">
        <div className="text-sm whitespace-pre-wrap break-words">{msg.text} </div>
        <div  className="text-xs opacity-60 mt-1">{msg.time}</div>
    </div>
    </div>
        )
      )}
      <div ref={ref}></div>
    </div>
    <div className="shirnk-0 p-3 rounded-2xl border-t border-gray-400 shadow-sm bg-white">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">

            <input value={text} placeholder="Type your message here..." onChange={(e) => setText(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();sendMessage()}}} className="flex-1 bg-transparent outline-none text-sm"></input>
            <button onClick={sendMessage} className="text-green-400 text-4xl">➤</button>

        </div>

       </div>
       
      </div>
      
    
        
    </div>)}
      
      
      </div>
      
    </>
  );
}

export default Chat
