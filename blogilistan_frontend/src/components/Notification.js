import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { Container, Message } from 'semantic-ui-react'


const Notification = (props) => {
    if (props.notification === null) {
        return null
    }
    return (
        <Container >
            {(props.notification &&
                <Message success>
                    {props.notification}
                </Message>
            )}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        showNotification: state.showNotification
    }
}

const mapDispatchToProps = {
    showNotification
}

const ConnectedNotification = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notification)

export default ConnectedNotification