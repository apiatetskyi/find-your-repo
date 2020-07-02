import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Sorting = React.memo(({ options = [], onChange = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [label, setLabel] = useState(options[0].label);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setLabel(option.label);
    setAnchorEl(null);
    onChange(option.order);
  };

  return (
    <div>
      <Button aria-haspopup="true" onClick={handleClick}>
        Stars: {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              handleClose(option);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});

export default Sorting;
