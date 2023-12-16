import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logOutUser } from "../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
// const pages = ["Home", "Products", "About us", "Contact Us"];

const pages = [
  {
    name: "Home",
    url: "",
  },
  {
    name: "Products",
    url: "products",
  },
  {
    name: "About Us",
    url: "aboutus",
  },
  {
    name: "Contact Us",
    url: "contactus",
  },
];
function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, error, user } = useSelector(
    (state) => state.userLoginRegister
  );
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log("Something ");
    setAnchorElUser(null);
  };
  const logoutHandler = () => {
    console.log("something");
    dispatch(logOutUser());
    toast.success("Logout Successfully");
    setAnchorElUser(null);
    navigate("/auth/login");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [navigate, dispatch, error, user]);
  // console.log(user.avatar.url);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                  }}
                  to="/"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                  }}
                  to="/products"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Products
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              <Link
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </Button>

            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              <Link
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                to="/products"
                style={{ color: "white", textDecoration: "none" }}
              >
                Products
              </Link>
            </Button>
          </Box>

          <Link to="product/search" className="search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Box sx={{ flexGrow: 0, ml: "50px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user ? user.avatar?.url : "/static/images/avatar/2.jpg"}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isAuthenticated ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                      }}
                      to={`/auth/login`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                      }}
                      to={`/auth/signup`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Sign Up
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link
                      onClick={logoutHandler}
                      to="/auth/login"
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Log Out
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/auth/account"
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={() => {
                        setAnchorElUser(null);
                      }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/auth/cart"
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={() => {
                        setAnchorElUser(null);
                      }}
                    >
                      Cart ({cartItems.length})
                    </Link>
                  </MenuItem>
                </>
              )}
              {user?.role === "admin" && (
                <MenuItem>
                  <Link
                    to="/admin/dashboard"
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                    }}
                    style={{ color: "black", textDecoration: "none" }}
                    onClick={() => {
                      setAnchorElUser(null);
                    }}
                  >
                    Dashboard
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
