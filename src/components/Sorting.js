import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Sorting = React.memo(({ options = [], onChange = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [label, setLabel] = useState(options[0].label);

  const onButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = (option) => {
    setAnchorEl(null);
  };

  const onSelect = (option) => {
    setLabel(option.label);
    onChange(option.order);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-haspopup="true" onClick={onButtonClick}>
        Stars: {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              onSelect(option);
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
