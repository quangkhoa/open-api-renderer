import { createSheet } from '../../theme'

const lineHeight = '40px'
const cellPadding = '1rem'

export const styles = createSheet(({ borders, backgrounds, text, sizes }) => ({
  'name': {
    verticalAlign: 'middle',
    width: '15%',
    whiteSpace: 'nowrap',
    position: 'relative',

    '&::before': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      borderTop: `1px solid ${borders.default}`,
      width: '2rem'
    },

    '& span': {
      display: 'inline-block',
      paddingRight: `${cellPadding}`,
      lineHeight,
      verticalAlign: 'middle',

      '&:first-child::before': {
        content: '""',
        display: 'inline-block',
        width: `${cellPadding}`,
        height: `8px`,
        verticalAlign: 'middle',
        borderLeft: `1px solid ${borders.default}`
      }
    }
  },

  'info': {
    verticalAlign: 'middle'
  },

  'additionalInfo': {
    fontSize: `${sizes.smaller}`,
    color: `${text.secondary}`,
    paddingBottom: '0.7rem',
    marginTop: '.5rem',

    '& a': {
      cursor: 'pointer'
    }
  },

  'constraints': {
    marginLeft: '.5rem',
    '& > span > span': {
      padding: '2px',
      backgroundColor: `${borders.secondary}`,
      marginLeft: '.5rem'
    }
  },

  'property': {
    '&:first-child': {
      '& $name::after': {
        content: '""',
        borderLeft: `1px solid ${borders.default}`,
        position: 'absolute',
        bottom: '0',
        left: '1rem',
        height: '50%'
      }
    },
    '&:last-child, &$last': {
      '& $name::after': {
        content: '""',
        borderLeft: `1px solid ${borders.default}`,
        position: 'absolute',
        top: '0',
        left: '1rem',
        height: '50%'
      }
    },
    '&:only-of-type': {
      '& $name::after': {
        border: 'none'
      }
    },
    '&:first-child$last': {
      '& $name::after': {
        border: 'none'
      }
    },
    '& + &': {
      '& $info': {
        borderTop: `1px solid ${borders.secondary}`
      },
      '& $name::after': {
        content: '""',
        borderLeft: `1px solid ${borders.default}`,
        position: 'absolute',
        bottom: '0',
        left: '1rem',
        height: '100%'
      }
    }
  },

  'required': {
    marginLeft: '1rem',
    color: 'red'
  },

  'isClickable': {
    cursor: 'pointer',
    fontWeight: 600
  },

  'isAdditional': {
    fontStyle: 'italic'
  },
  'isCircularReference': {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },

  'last': {},

  'enum': {
    display: 'inline-block',
    padding: '0 5px',
    margin: '2px 3px',
    border: `1px solid ${borders.strong}`
  },
  'default': {
    extend: 'enum'
  },
  'indicator': {},
  'format': {},
  'subType': {}
}))
