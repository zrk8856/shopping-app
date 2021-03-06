import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from '../features/cartSlice';
import SearchBar from './SearchBar';
import { Button, Grid } from '@mui/material';
import { AppBar, Toolbar } from "@mui/material";

function NavBar({ user, setProducts, search, setSearch, setCartOpen }) {
  const carts = useSelector((state) => state.carts.entities)
  const itemsInCarts = carts.reduce((previous, current) => previous + current.quantity, 0)
  const dispatch = useDispatch()

  // Since setUser in the App component is async, it will return user at a later time. Thus userId will be null the first time.
  // Thus the return data from server will be null since the url containing userId will be invalid, that will cause null.reduce, 
  // which is an error. So I add an if statement to only run the code within useEffect if the userId exists.
  // After the user data comes back, setUser will re-render components, this time useId exists, but in order to let code within useEffect
  // run the second time, the dependency array need to be the data that changes, in this case, userId, instead of []
  useEffect(() => {
    if (user.id) {
      dispatch(fetchCarts(user.id))
    }    
  }, [user.id])

  function handleHomeClick() {
    setSearch("")
  }

  return (
    <div>
      <AppBar position="static" >
        <Toolbar >
          <Grid container>

            <Grid item >
              <NavLink to="/" onClick={handleHomeClick} style={{ textDecoration: "none" }}>
                <Button color="secondary">
                  Home
                </Button>             
              </NavLink>
            </Grid>
            
            <Grid justifyContent="flex-start" sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, ml: 3 }} >
              <SearchBar setProducts={setProducts} search={search} setSearch={setSearch} />
            </Grid>

            <Grid item sx={{marginRight: 1}} >
              <NavLink to="/orders" style={{ textDecoration: "none" }}>
                <Button color="secondary">
                  Order History
                </Button>
              </NavLink> 
            </Grid>

            <Grid item sx={{marginRight: 1}} >
              {/* <NavLink to="/carts"> */}
                <Button color="secondary" onClick={() => setCartOpen(true)}>
                  Cart: {itemsInCarts}
                </Button>
              {/* </NavLink> */}
            </Grid>

            <Grid item >
              {user.id ? 
              <div>
                Hello, <strong>{user.name}</strong>
                <NavLink to="/logout" style={{ textDecoration: "none" }}>
                  <Button color="secondary">
                    Logout
                  </Button>
                </NavLink>
              </div> : 
              <div>
                Hello, <strong>guest</strong>
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  <Button color="secondary">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup" style={{ textDecoration: "none" }}>
                  <Button color="secondary">
                    Signup
                  </Button>
                </NavLink><br/>
              </div>}  
            </Grid>

          </Grid> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;