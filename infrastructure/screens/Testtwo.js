import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Test from './Test'

const images = [
    "https://images.pexels.com/photos/14786701/pexels-photo-14786701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/16935195/pexels-photo-16935195/free-photo-of-fashion-people-woman-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/15283499/pexels-photo-15283499/free-photo-of-photo-of-a-groom-walking-around-the-old-town.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/16935195/pexels-photo-16935195/free-photo-of-fashion-people-woman-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


]
console.log(images.length)
const Testtwo = () => {
    const [presentImage, setPresentImage] = useState(images[0]);
    const [counter, setCounter] = useState(0);
  return (
    <Test
    image={presentImage}
    renderLeftActions={() => {
      if (images.length > counter) {
         setPresentImage(images[counter + 1])
         setCounter(counter +1)

        } 
        if(images.length -1  === counter){
          setPresentImage(images[0])
          setCounter(0)

        }
      }  
    }
      
   renderRightActions={() => {
    if (images.length > counter) {
      setPresentImage(images[counter + 1])
      setCounter(counter +1)

     } 
     if(images.length -1  === counter){
       setPresentImage(images[0])
       setCounter(0)

     }
   }}
    />
  )
}

export default Testtwo