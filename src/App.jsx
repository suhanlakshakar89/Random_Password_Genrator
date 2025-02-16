import { useState } from 'react'
import './App.css'
import { useCallback, useEffect, useRef } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  const [length, setlength] = useState(8)
  const [NumberAllow, setNumberAllow] = useState(false)
  const [CharAllow, setCharAllow] = useState(false)
  const [Password, setPassword] = useState("") 

  // UseRef 
  const passwordref = useRef(null)

  // password genrator 
  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (NumberAllow) str += "0123456789"
    if (CharAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, NumberAllow, CharAllow, setPassword])   

  const CopyPasswordToClipboard = useCallback(() =>
                            { 
                            passwordref.current?.select();
                            passwordref.current?.setSelectionRange(0, 999);
                            window.navigator.clipboard.writeText(Password)

                            }, [Password]) 



  // UseEffect () --> 
  useEffect(() => {
    PasswordGenerator()
  }, [length,NumberAllow,CharAllow,PasswordGenerator])

  
 


  return (
    <>
      <div className='w-full max-w-md max-auto shadow-lg rounded-lg px-4 py-3 m-8 justify-center text-orange-400 bg-slate-400'>

        <h1 className='rounded-2xl  text-xl text-center text-green-400 my-3'>Password Generator </h1>

        <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full px-3 py-1'
            placeholder='Password'
            readOnly 
            ref = {passwordref}
            
          />
          <button  
          onClick={CopyPasswordToClipboard}
          className='outline-none bg-blue-500 text-white text-xl px-3 py-1 rounded-lg shrink-0 transition  hover:bg-blue-700 cursor-pointer'>
          Copy</button>
        </div>

        <div className='flex gap-x-2 text-sm'>

          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label> length :{length} </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={NumberAllow}
              id='NumberInput'
              onChange={() => {
                setNumberAllow((prev) => !(prev));
              }}
            />
            <label htmlFor="NumberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={CharAllow}
              id='CharInput'
              onChange={() => {
                setNumberAllow((prev) => !(prev));
              }}
            />
            <label htmlFor="CharInput">Charaters</label>
          </div>

        </div>
      </div>

    </>
  )
}

 // for Random Number ---> 
  // console.log(Math.floor(Math.random()*25 +1 ));
  
export default App
