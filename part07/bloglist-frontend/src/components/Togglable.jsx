import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // give the function to step back
  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <Box sx={{ mt: 2 }}>
      {!visible ? (
        <Button variant="outlined" onClick={toggleVisibility} sx={{ mb: 2 }}>
          {props.buttonLabelShow}
        </Button>
      ) : (
        <Box>
          {props.children}
          <Button variant="text" onClick={toggleVisibility} sx={{ mt: 1 }}>
            {props.buttonLabelHide}
          </Button>
        </Box>
      )}
    </Box>
  )
})

Togglable.propTypes = {
  buttonLabelShow: PropTypes.string.isRequired,
  buttonLabelHide: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Togglable
