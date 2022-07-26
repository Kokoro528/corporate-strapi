import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SelectBarWrapper = styled.li.attrs(props => ({
  className: props.selectBarItemWrapperClassName
}))`
  display: flex;
  margin: 0 5px;
  cursor: pointer;
`

const SelectBar = ({
  index,
  isActive = false,
  selectBar: SelectCustom,
  // selectBarItemWrapperClassName,
  onClick,
  ...rest
}) => {
  const handleClick = useCallback(() => {
    onClick(index)
  }, [index, onClick])

  return (
    <SelectBarWrapper onClick={handleClick} {...rest}>
      {SelectCustom ? (
        <SelectCustom isActive={isActive} index={index} />
      ) : (
        <span>{index}</span>
      )}
    </SelectBarWrapper>
  )
}

SelectBar.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  selectBar: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType
  ]),
  onClick: PropTypes.func.isRequired,
  selectBarItemWrapperClassName: PropTypes.string
}

export default SelectBar
