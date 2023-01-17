import React from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import Search from './Search';
const Header = () => {
    const [value, setvalue] = useState();
    const dispatch = useDispatch()
    const isLoggedin = useSelector((state) => state.isLoggedin);
    console.log(isLoggedin);
    return (
        <div>
            <AppBar position="sticky" sx={{
                backgroundColor: "lightBlue",
                // backgroundImage: "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
            }}>
                <Toolbar>
                    <img src="data:image/jpeg;base64,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" style={{ borderRadius: "20px", width: 80 }} />
    
                    <Tabs
                        sx={{ marginLeft: 10}}
                        value={value}
                        onChange={(e, val) => { setvalue(val) }}>
                        <Tab
                            LinkComponent={Link}
                            to="/books"
                            label="All Books" />
                        {isLoggedin &&
                            <Tab
                                LinkComponent={Link}
                                to="/myBooks"
                                label="My Books" />}
                        {isLoggedin &&
                            <Tab
                                LinkComponent={Link}
                                to="/books/add"
                                label="Add Books" />
                        }


                    </Tabs>
                    {
                    <Button LinkComponent={Link} to="/books/search">search</Button>
}
                    {
                    !isLoggedin && <Button LinkComponent={Link} to='/auth' variant="contained" sx={{ color: "white", borderRadius: "11px", fontSize: "10px", marginLeft: 25 }}>Login</Button>
                    }

                    {
                    isLoggedin &&
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            LinkComponent={Link}
                            to="/auth"
                            variant="contained"
                            sx={{
                                color: "white",
                                borderRadius: "11px",
                                fontSize: "10px",
                                marginLeft: 25
                            }}>

                            Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header