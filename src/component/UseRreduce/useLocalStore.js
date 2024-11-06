import React, { useEffect, useState } from "react"

const useLocalStore = (initial, key)=>{

    const [value, setValue]= useState(()=> {
        const storageValue = localStorage.getItem('state.listes')
        return storageValue ? JSON.parse(storageValue) : initial
    })
    
useEffect(()=>{
    localStorage.setItem('state.listes', JSON.stringify(value))
},[value, key])

    return [value, setValue]
}


export default useLocalStore