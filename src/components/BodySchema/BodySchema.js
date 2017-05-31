import React, { Component } from 'react'
import createFragment from 'react-addons-create-fragment'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Property from '../Property/Property'

import './BodySchema.scss'

export default class BodySchema extends Component {
  constructor (props) {
    super(props)

    this.renderPropertyRow = this.renderPropertyRow.bind(this)
    this.renderSubsetProperties = this.renderSubsetProperties.bind(this)
    this.onClick = this.onClick.bind(this)

    this.state = {
      expandedProp: []
    }
  }

  render () {
    const { properties, styleVariation } = this.props

    if (!properties) {
      return null
    }

    const { expandedProp } = this.state

    return (
      <table className={classNames('body-schema', `body-schema--${styleVariation}`)}>
        <tbody>
          {properties.map((property, i) => {
            const isLast = (properties.length === i + 1)

            if (property.properties === undefined) {
              return this.renderPropertyRow(property, isLast)
            }

            const isPropertyArray = property.type.includes('array')
            const isPropertyObject = property.type.includes('object')

            if (isPropertyArray || isPropertyObject) {
              if (expandedProp.includes(property.name)) {
                return createFragment({
                  property: this.renderPropertyRow(property, isLast, true, true),
                  subset: this.renderSubsetProperties(property, isPropertyArray)
                })
              }

              return this.renderPropertyRow(property, isLast, false, true)
            }
          })}
        </tbody>
      </table>
    )
  }

  renderPropertyRow (property, isLast, isOpen = undefined, hasSubset = false) {
    return (
      <Property
        key={property.name}
        name={property.name}
        type={property.type}
        subtype={property.subtype}
        description={property.description}
        enumValues={property.enum}
        defaultValue={property.defaultValue}
        constraints={property.constraints}
        onClick={hasSubset ? this.onClick : undefined}
        isRequired={property.required}
        isOpen={isOpen}
        isLast={isLast}
      />
    )
  }

  renderSubsetProperties (property, isArray = false) {
    const { styleVariation } = this.props
    const nextStyleVariation = (styleVariation === 'even') ? 'odd' : 'even'

    return (
      <tr className='body-schema-subset'>
        <td colSpan='100'>
          {isArray && <div>Array [</div>}
          <BodySchema
            key={`${property.name}-properties`}
            properties={property.properties}
            styleVariation={nextStyleVariation}
          />
          {isArray && <div>]</div>}
        </td>
      </tr>
    )
  }

  onClick (propertyName) {
    const { expandedProp } = this.state
    if (expandedProp.includes(propertyName)) {
      const newExpanded = expandedProp.filter((prop) => prop !== propertyName)
      this.setState({ expandedProp: newExpanded })
    } else {
      this.setState({ expandedProp: [...expandedProp, propertyName] })
    }
  }
}

BodySchema.propTypes = {
  properties: PropTypes.array,
  styleVariation: PropTypes.oneOf([
    'odd',
    'even'
  ])
}
