import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiDownArrow, BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../redux/reducers/auth";
import NavFriendReq from "./NavFriendReq";
import SocketNotifications from "./SocketNotifications";
import Notifications from "./Notifications";
import { io } from "socket.io-client";
import { useSocket } from "../../App";
import { FcSearch } from "react-icons/fc";
import { TiMessages } from "react-icons/ti";
import LogoutIcon from "@mui/icons-material/Logout";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
const NavBar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const socket = useSocket(io);
  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //redux login states
  const { token, userId, isLoggedIn, roleId, newMsg, userinfo } = useSelector(
    (state) => {
      //return object contains the redux states
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        userId: state.auth.userId,
        roleId: state.auth.roleId,
        newMsg: state.messenger.newMsg,
        userinfo: state.auth.userinfo,
      };
    }
  );

  //get user info, so i could use user info, such as name and pic
  //! to be used in advance
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data.info);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //navigations functions
  const goToMyProfile = () => {
    navigate(`/profile/${userId}`);
    setShowBasic(false);
  };

  const login = () => {
    navigate(`/login`);
    setShowBasic(false);
  };

  const register = () => {
    navigate(`/register`);
    setShowBasic(false);
  };

  const goToHome = () => {
    navigate(`/home`);
    setShowBasic(false);
  };

  const searchNow = () => {
    navigate(`/home/${searchValue}`);
    setShowBasic(false);
  };

  const goToMessenger = () => {
    navigate(`/messenger`);
    setShowBasic(false);
  };

  return (
    <div>
      {roleId == 1 ? (
        ""
      ) : isLoggedIn ? (
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <MDBBtn
                color="dark"
                className="btn btn-dark btn-sm"
                onClick={searchNow}
              >
                <FcSearch size={20} />
              </MDBBtn>
            </form>
            <MDBNavbarItem
              onClick={() => {
                goToHome();
              }}
            >
              <MDBNavbarLink active aria-current="page" href="#">
                <BiHome size={20} />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">
                <NavFriendReq />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem
              onClick={() => {
                goToMessenger();
              }}
            >
              <MDBNavbarLink href="#" className={newMsg ? "newMsg" : ""}>
                <TiMessages color="royalblue" size={20} />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink>
                <Notifications />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <div className="userInfo">
                  <span>
                    {" "}
                    <img
                      src={
                        userinfo.avatar
                          ? userinfo.avatar
                          : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                      }
                      alt=""
                    />
                    <BiDownArrow size={12} />
                  </span>
                </div>
              </Button>
              <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          style: {  
            width: 120,  
          },  
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: .01,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
                <MenuItem
                  onClick={() => {
                    goToMyProfile();
                    setAnchorEl(null);
                  }}
                >
                  {" "}
                  <CgProfile />&nbsp;Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    setAnchorEl(null);
                    navigate("/login");
                  }}
                >
                  <MdOutlineLogout />&nbsp;Logout
                </MenuItem>
              </Menu>
            </MDBNavbarItem>
          </MDBContainer>
        </MDBNavbar>
      ) : (
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ border: " 1px solid black" }}
              onClick={() => setShowBasic(!showBasic)}
            ></MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem
                  onClick={() => {
                    login();
                  }}
                >
                  <MDBNavbarLink active aria-current="page" href="#">
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem
                  onClick={() => {
                    register();
                  }}
                >
                  <MDBNavbarLink active>Register</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <SocketNotifications socket={socket} />
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      )}
    </div>
  );
};

export default NavBar;
