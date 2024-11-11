import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { UserAuth } from '../contex/AuthContext';
import NavigationLink from './shared/NavigationLink';

function Header() {
  const auth = UserAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg='#00cccc'
                to='/chat'
                text='Go to Chat'
                textcolor='black'
              />
              <NavigationLink
                bg='#52538f'
                to='/'
                text='logout'
                textcolor='white'
                onClick={() => auth?.logout()}
              />
            </> 
          ) : (
              <>
                <NavigationLink
                  bg='#00cccc'
                  to='/login'
                  text='Login'
                  textcolor='black'
                />
                <NavigationLink
                  bg='#52538f'
                  to='/signup'
                  text='Signup'
                  textcolor='white'
                />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header