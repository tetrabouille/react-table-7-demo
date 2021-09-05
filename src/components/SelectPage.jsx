import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const SelectPage = ({
  pageSizesList,
  setPageSize,
  pageSize,
  label,
  getExtraProps,
}) => {
  const options = useMemo(
    () =>
      pageSizesList.map((localPageSize) => ({
        text: `${localPageSize} ${label}`,
        value: localPageSize,
      })),
    [label, pageSizesList]
  )

  return (
    <Dropdown
      selection
      options={options}
      defaultValue={pageSize}
      onChange={(e, { value }) => {
        setPageSize(Number(value))
      }}
      {...getExtraProps()}
    />
  )
}

SelectPage.propTypes = {
  // Enumeration des options de sélection du nombre de lignes par page.
  pageSizesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  // Fonction de react-table pour changer la taille des pages.
  setPageSize: PropTypes.func.isRequired,
  // Nombre de ligne dans la table, fournis par react-table.
  pageSize: PropTypes.number.isRequired,
  // Label à rajouter aprés le nombre de page dans les options de sélection.
  label: PropTypes.string,
  // Fonction qui retourne des props supplémentaire à passer à Select.
  getExtraProps: PropTypes.func,
}

SelectPage.defaultProps = {
  label: '',
  getExtraProps: () => ({}),
}

export default SelectPage
