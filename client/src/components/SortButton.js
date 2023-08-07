import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import { createTheme } from "@mui/material/styles"; // Import createTheme

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#333"
    },
  },
});

function SortButton({ options, handleSort }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <IconButton color="primary" onClick={handleClick}>
          <SvgIcon style={{ fontSize: 24 }}>
            <path
              fill="#fff" 
              d="M5 18.66L12 11.66L19 18.66H5Z"
            />
          </SvgIcon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleSort(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </ThemeProvider>
    </>
  );
}

export default SortButton;
