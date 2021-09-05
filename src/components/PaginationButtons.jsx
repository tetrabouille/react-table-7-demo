/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Button, Icon } from 'semantic-ui-react'

const PaginationButtons = ({
  nextPage,
  previousPage,
  gotoPage,
  pageCount,
  disableNext,
  disablePrevious,
  pageIndex,
  pagesLength,
  getButtonsProps,
  getLabelProps,
  getInputProps,
}) => {
  // States
  const [state, setState] = useState({
    toggleInputPage: false,
    inputPage: String(pageIndex),
  })

  // Automatically focus on input when toggled
  const inputRef = useRef(null)
  useEffect(() => {
    if (state.toggleInputPage) {
      inputRef.current.focus()
    }
  }, [state.toggleInputPage])

  // Custom width for the input according to the length of the input value
  const dynamicInputProps = useMemo(() => {
    const inputProps = getInputProps()
    inputProps.style = {
      ...inputProps.style,
      maxWidth: `max(${(state.inputPage.length + 3) * 8}px, 3rem)`,
    }
    return inputProps
  }, [getInputProps, state.inputPage.length])

  const renderPagesLabel = useMemo(() => {
    // Toggle input or label and reset state.inputPage
    const handleToggleInputPage = () => {
      setState({
        toggleInputPage: !state.toggleInputPage,
        inputPage: '',
      })
    }

    // Handle change on the input
    const handleInputPage = (e, { value }) => {
      if (value === '') setState({ ...state, inputPage: '' })
      else {
        let numberValue = Number(value)
        if (!Number.isNaN(numberValue)) {
          if (numberValue <= 0) numberValue = 1
          else if (numberValue > pageCount) numberValue = pageCount
          setState({ ...state, inputPage: String(numberValue) })
        }
      }
    }

    // Handle enter key pressed on input
    const onEnter = (e) => {
      if (e.key === 'Enter') {
        setState({ ...state, toggleInputPage: false })
        gotoPage(Number(state.inputPage) - 1)
      }
    }

    // Render label or input
    if (pageIndex) {
      return state.toggleInputPage ? (
        <Input
          ref={inputRef}
          value={state.inputPage}
          onBlur={handleToggleInputPage}
          onKeyDown={onEnter}
          onChange={handleInputPage}
          {...dynamicInputProps}
        />
      ) : (
        <Label
          size="large"
          onClick={handleToggleInputPage}
          {...getLabelProps()}
        >
          {pagesLength ? `${pageIndex}/${pagesLength}` : pageIndex}
        </Label>
      )
    }
    return null
  }, [
    dynamicInputProps,
    getLabelProps,
    gotoPage,
    pageCount,
    pageIndex,
    pagesLength,
    state,
  ])

  const gridTemplateColumns = useMemo(
    () => (pageIndex ? '1fr 4fr 1fr 4fr 1fr' : '1fr 1fr 1fr 1fr'),
    [pageIndex]
  )

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
        onClick={() => {
          gotoPage(0)
        }}
        disabled={disablePrevious}
        {...getButtonsProps()}
      />
      <Button
        icon
        onClick={previousPage}
        labelPosition="left"
        disabled={disablePrevious}
        {...getButtonsProps()}
      >
        Précédent
        <Icon name="angle left" />
      </Button>
      {renderPagesLabel}
      <Button
        icon
        onClick={nextPage}
        labelPosition="right"
        disabled={disableNext}
        {...getButtonsProps()}
      >
        Suivant
        <Icon name="angle right" />
      </Button>
      <Button
        icon="angle double right"
        onClick={() => {
          gotoPage(pageCount - 1)
        }}
        disabled={disableNext}
        {...getButtonsProps()}
      />
    </div>
  )
}

PaginationButtons.propTypes = {
  // Fonction de react-table pour aller à la page suivante
  nextPage: PropTypes.func.isRequired,
  // Fonction de react-table pour aller à la page précédente
  previousPage: PropTypes.func.isRequired,
  // Fonction de react-table pour aller à la page passé en parametre
  gotoPage: PropTypes.func.isRequired,
  // Nombre de page total
  pageCount: PropTypes.number.isRequired,
  // Boolean récupéré de react-table pour désactiver le bouton next
  disableNext: PropTypes.bool,
  // Boolean récupéré de react-table pour désactiver le bouton previous
  disablePrevious: PropTypes.bool,
  // Fonction pour passer des props en plus aux 2 boutons
  getButtonsProps: PropTypes.func,
  // Fonction pour passer des props en plus au label de pagination
  getLabelProps: PropTypes.func,
  // Fonction pour passer des props en plus à Input
  getInputProps: PropTypes.func,
  // Index de la page courante
  pageIndex: PropTypes.number,
  // Nombre total de pages
  pagesLength: PropTypes.number,
}

PaginationButtons.defaultProps = {
  disableNext: false,
  disablePrevious: false,
  getButtonsProps: () => ({}),
  getLabelProps: () => ({}),
  getInputProps: () => ({}),
  pageIndex: undefined,
  pagesLength: undefined,
}

export default PaginationButtons
