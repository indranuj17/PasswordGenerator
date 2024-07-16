import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  
  const [length, setlength]=useState(8);
  const [numbersAll, setnumbersAll]=useState(false);
  const [charAll, setcharAll]=useState(false);
  const [password, setpassword]=useState("");

  const Passref=useRef(null);    //you can take a reference of any element/component to manipulate with those....here ref is passed to input password(ref={password})
  Passref.current?.select();
  Passref.current?.setSelectionRange(0,100);


  const copyPasstoClipboard=useCallback(()=>{                      //1
    window.navigator.clipboard.writeText(password)
    Passref.current?.select()
  Passref.current?.setSelectionRange(0,8)
  },[password])

  
  
  const passwordGenerator=useCallback(()=>{                         //2
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrst";

    if(numbersAll) str+="1234567890";
    if(charAll) str+="!@#$%^&*(){}[]";

    for(let i=1;i<=length;i++){   //run loop till lenght of password given
           let index=Math.floor(Math.random()*str.length+1); //random index generated
           
           pass+=str.charAt(index);

    }
    setpassword(pass);

  } , [length,numbersAll,charAll,setpassword])

  useEffect(()=>{passwordGenerator()}, [length,numbersAll,charAll,passwordGenerator]);

 
 
 
 
  return (
      <div className='bg-black w-full h-full'>
     <div className='w-full  bg-gradient-to-b from-slate-600 to-slate-800 max-w-lg mx-auto my-auto bg-slate-800 px-6  shadow-md rounded-lg  py-10 my-8 text-orange-500'>
     <h1 className='text-white text-center mb-4 py-5 '>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input
        type='text'
        value={password}
        placeholder="Generate Password"
        className='outline-none w-full py-1 px-3  rounded-md'
        readOnly
        ref={Passref}
        />
        <button onClick={copyPasstoClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>Copy</button> 
        </div>                                                                                                
       
       
        <div className='flex text-sm gap-x-4'>
          
          <div className='flex'>
            <input 
            type="range"
            min={8}
            max={100}
            
            value={length}
            className=' text-sky-500'
            onChange={(e)=>{
              setlength(e.target.value)
            }} />

            <label>Length: {length}</label>
          </div>

          <div className='flex gap-x-2'>
             <input 
             type="checkbox"
             defaultChecked={numbersAll}
              className='font-semibold '
              onChange={()=>{
                setnumbersAll((prev)=>!prev)
              }}/>

              <label >Numbers</label>
          </div>

          <div className='flex gap-x-1'>
             <input 
             type="checkbox"
             defaultChecked={charAll}
              className='font-semibold '
              onChange={()=>{
                setcharAll((prev)=>!prev)
              }}/>

              <label >Characters</label>
          </div>

        </div>
        </div>

        </div>

      
      
     
     
      
       
      
   
  )
}

export default App
