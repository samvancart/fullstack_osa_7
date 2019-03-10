import React, { useState, useImperativeMethods } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeMethods(ref, () => {
        return {
            toggleVisibility
        }
    })

    Toggleable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

export default Toggleable
