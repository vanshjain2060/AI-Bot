import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from "@mui/material";
const Logo = () => {
  return (


    <div style={{ display: "flex", marginRight: "auto", alignItems: "center", gap: "15px" }}>
    <Link to={"/"} style={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none", color: "white" }}>
          <img src="openai.png" alt="openai" width={'30px'} height={'30px'} className='image-inverted' />
          <span style={{ fontSize: "20px", marginLeft: "15px" }}>MERN-GPT</span>
    </Link>
          {/* <Link to={"/"}>
              <img src="openai.png" alt="openai" width={'30px'} height={'30px'} className='image-inverted' />
          
              {/* <Typography sx={{
                  display: { md: 'block',  },
                  mr: 'auto',
                  fontWeight: '800',
                  textDecoration: 'none',
                  textShadow: '2px 2px 20px #000',
              }}>
                  <span style={{fontSize: "20px"}}>MERN</span>-GPT
              </Typography>
              <div><span style={{ fontSize: "20px", display: "inline" }}>MERN</span>-GPT</div>
          </Link>  */}
    </div>
  )
}

export default Logo