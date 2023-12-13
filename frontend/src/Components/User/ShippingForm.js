import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { shippingInfoAction } from "../../Actions/cartAction";
import ProgressBar from "../Layout/ProgressBar";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const ShippingForm = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const navigate = useNavigate();
  const submitAddressData = (e) => {
    e.preventDefault();
    const phoneValidation = phone && phone.length === 10;
    console.log(phoneValidation);
    if (!phoneValidation) {
      toast.error("Phone Number Must be 10 Digit");
    }
    const validation =
      phoneValidation && address && city && pincode && state && country;
    console.log(validation);
    if (phoneValidation && address && city && pincode && state && country) {
      dispatch(
        shippingInfoAction({ address, city, pincode, state, country, phone })
      );

      navigate("/auth/order/confirm");
    }
  };
  const getStateHandler = (e) => {
    setState(e.target.value);
  };
  const getCountryHandler = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
  };
  return (
    <div>
      <div>
        <ProgressBar value={20} />
      </div>
      <form onSubmit={submitAddressData} className="form">
        <h1>Shipping Info</h1>
        <div>
          <TextField
            id="outlined-required"
            label="Address"
            variant="outlined"
            value={address}
            type="text"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-required"
            label="City"
            variant="outlined"
            value={city}
            type="text"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-required"
            label="Pin Code"
            variant="outlined"
            value={pincode}
            type="number"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-required"
            label="Phone Number"
            variant="outlined"
            value={phone}
            type="number"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              minWidth: "30vmax",
              background: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={getCountryHandler}
                sx={{ paddingLeft: "2vmax" }}
              >
                {Country.getAllCountries().map((country) => {
                  return (
                    <MenuItem value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        {country && (
          <div>
            <Box
              sx={{
                minWidth: "30vmax",
                background: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="Country"
                  onChange={getStateHandler}
                  sx={{ paddingLeft: "2vmax" }}
                >
                  {State.getStatesOfCountry(country).map((state) => {
                    return (
                      <MenuItem value={state.name} key={state.isoCode}>
                        {state.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
        )}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ShippingForm;
