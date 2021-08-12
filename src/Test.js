import React,{useState, useEffect, useCallback} from 'react'

function Comp() {
    const [count,setCount]=useState(0)

    useEffect(() => {
       return () => {
           function test(count){
            console.log(count , "first")
           }
           test(count)
        }
    }, [])

     useEffect(() => {
       return () => {
         console.log(count , "second")
       }
     }, [count])


    const increment = useCallback(
        () => {
            setCount((count) => count+1)
        },
        [count],
    )

    return (
        <div>
        <button onClick={increment}>Increment</button>        
        </div>
    )
}

export default Comp





