import React from 'react'
import { Mosaic } from 'react-loading-indicators'

function Loading() {
  return (
    <div style={{display:"flex", flexDirection:"row" }} >
      <Mosaic color="#32cd32" size="medium" text="" textColor="" />
      <p style={{color:"black",  fontSize:"20px" }} >YÜKLENİYOR</p>
    </div>
   
  )
}

export default Loading