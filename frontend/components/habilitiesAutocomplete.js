import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import React from 'react';

export default function HabilitiesAutocomplete({
  habilities = [],
  handleOnSelectValues = () => {},
  selectedHabilities = [],
}) {
  return (
    <div>
      <Multiselect
        options={habilities}
        selectedValues={ selectedHabilities}
        onSelect={handleOnSelectValues}
        onRemove={handleOnSelectValues}
        displayValue='title'
        placeholder='Seleccione sus habilidades'
        hidePlaceholder={selectedHabilities.length > 0}
        style={{
          searchBox: { border: '2px solid #19857b', fontSize: '1.7rem' },
          chips: { background: '#19857b' },
        }}
        selectionLimit={6}
      />
    </div>
  );
}

HabilitiesAutocomplete.propTypes = {
  habilities: PropTypes.array.isRequired,
  handleOnSelectValues: PropTypes.func.isRequired,
  selectedHabilities: PropTypes.array.isRequired,
};

HabilitiesAutocomplete.defaultProps = {
  habilities: [],
  handleOnSelectValues: () => {},
  selectedHabilities: [],
};
