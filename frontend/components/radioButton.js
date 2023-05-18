import styled from '@emotion/styled';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import styles from '../styles/Radio.module.css';

const CustomFormControlLabel = styled(FormControlLabel)({
  fontSize: props => props.fontSizeLabel ?? '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function RadioButton({
  roles = [],
  isSelected = false,
  handleOnSelectOption = () => {},
  fontSizeLabel = '1.5rem',
}) {
  return (
    <>
      <FormControl>
        <FormLabel id='demo-row-radio-buttons-group-label'>
          ¿Te unes como contratante o freelancer?
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          value={isSelected}
          onChange={handleOnSelectOption}
          className={styles['radio-container']}
        >
          {roles?.length > 0 &&
            roles?.map((role, index) => (
              <CustomFormControlLabel
                key={index}
                value={role?._id}
                control={<Radio />}
                label={role?.name}
                disableTypography={false}
                fontSizeLabel={fontSizeLabel}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

RadioButton.propTypes = {
  roles: PropTypes.array.isRequired,
};

RadioButton.defaultProps = {
  roles: [],
  isSelected: false,
  handleOnSelectOption: () => {},
  fontSizeLabel: '1.2rem',
};
