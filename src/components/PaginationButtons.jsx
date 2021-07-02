/* eslint-disable no-unused-vars */
import React, {
  useMemo, useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Input, Label, Button, Icon,
} from 'semantic-ui-react';

const PaginationButtons = ({
  nextPage,
  previousPage,
  gotoPage,
  pageCount,
  disableNext,
  disablePrevious,
  pageIndex,
  pagesLength,
  buttonsProps,
  labelProps,
  inputProps,
}) => {
  // States
  const [toggleInputPage, setToggleInputPage] = useState(false);
  const [inputPage, setInputPage] = useState(String(pageIndex));
  const [inputWidth, setInputWith] = useState(25);

  // Ref
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  // Automatically focus on input when toggled
  useEffect(() => {
    if (toggleInputPage) {
      inputRef.current.focus();
    }
  }, [toggleInputPage]);

  // Set the width for input as the same of the label's width
  useEffect(() => {
    if (labelRef.current?.clientWidth) {
      setInputWith(labelRef.current.clientWidth);
    }
  }, [labelRef.current?.clientWidth]);

  // Toggle input or label and reset state.inputPage
  const handleToggleInputPage = () => {
    setToggleInputPage(!toggleInputPage);
    setInputPage('');
  };

  // Handle change on the input
  const handleInputPage = (e, { value }) => {
    if (value === '') setInputPage('');
    else {
      let numberValue = Number(value);
      if (!Number.isNaN(numberValue)) {
        if (numberValue <= 0) numberValue = 1;
        else if (numberValue > pageCount) numberValue = pageCount;
        setInputPage(String(numberValue));
      }
    }
  };

  // Handle enter key pressed on input
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      setToggleInputPage(false);
      gotoPage(Number(inputPage) - 1);
    }
  };

  const gridTemplateColumns = useMemo(() => (
    pageIndex ? '1fr 4fr 1fr 4fr 1fr' : '1fr 1fr 1fr 1fr'
  ), [pageIndex]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns,
        gridColumnGap: '5px',
      }}
    >
      <Button
        icon="angle double left"
        onClick={() => { gotoPage(0); }}
        disabled={disablePrevious}
        {...buttonsProps}
      />
      <Button
        icon
        onClick={previousPage}
        labelPosition="left"
        disabled={disablePrevious}
        {...buttonsProps}
      >
        Précédent
        <Icon name="angle left" />
      </Button>
      {!!pageIndex && (
        toggleInputPage
          ? (
            <Input
              ref={inputRef}
              value={`${inputPage}`}
              onBlur={handleToggleInputPage}
              onKeyDown={onEnter}
              onChange={handleInputPage}
              {...inputProps}
              style={{
                ...inputProps.style,
                maxWidth: `${inputWidth}px`,
              }}
            />
          )
          : (
            <div
              ref={labelRef}
            >
              <Label
                size="large"
                onClick={handleToggleInputPage}
                {...labelProps}
              >
                {pagesLength ? `${pageIndex}/${pagesLength}` : pageIndex}
              </Label>
            </div>
          )
      )}
      <Button
        icon
        onClick={nextPage}
        labelPosition="right"
        disabled={disableNext}
        {...buttonsProps}
      >
        Suivant
        <Icon name="angle right" />
      </Button>
      <Button
        icon="angle double right"
        onClick={() => { gotoPage(pageCount - 1); }}
        disabled={disableNext}
        {...buttonsProps}
      />
    </div>
  );
};

PaginationButtons.propTypes = {
  // Fonction de react-table pour aller à la page suivante
  nextPage: PropTypes.func.isRequired,
  // Fonction de react-table pour aller à la page précédente
  previousPage: PropTypes.func.isRequired,
  // Fonction de react-table pour aller à la page passé en parameter
  gotoPage: PropTypes.func.isRequired,
  // Nombre de page total
  pageCount: PropTypes.number.isRequired,
  // Boolean récupéré de react-table pour désactiver le bouton next
  disableNext: PropTypes.bool,
  // Boolean récupéré de react-table pour désactiver le bouton previous
  disablePrevious: PropTypes.bool,
  // Passer des props en plus aux 2 boutons
  buttonsProps: PropTypes.objectOf(PropTypes.any),
  // Passer des props en plus au label de pagination
  labelProps: PropTypes.objectOf(PropTypes.any),
  // Passer des props en plus à Input
  inputProps: PropTypes.objectOf(PropTypes.any),
  // Index de la page courante
  pageIndex: PropTypes.number,
  // Nombre total de pages
  pagesLength: PropTypes.number,
};

PaginationButtons.defaultProps = {
  disableNext: false,
  disablePrevious: false,
  buttonsProps: {},
  labelProps: {},
  inputProps: {},
  pageIndex: undefined,
  pagesLength: undefined,
};

export default PaginationButtons;
