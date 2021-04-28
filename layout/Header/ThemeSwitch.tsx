import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

import { ThemeContext, themes } from 'config/theme'


interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const GreySwitch = withStyles({
  switchBase: {
    color: "#000000",
    '&$checked': {
      color: grey[500],
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);



export default function CustomizedSwitches(props) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div {...props}>
      <FormGroup>
        <FormControlLabel
          control={<GreySwitch checked={themes.dark === theme} onChange={toggleTheme} name="darkMode" />}
          label="dark mode"
        />
      </FormGroup>
    </div>
  );
}