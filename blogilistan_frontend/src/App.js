import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { showNotification } from './reducers/notificationReducer'
import { Container, Form, Button } from 'semantic-ui-react'


const App = (props) => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [blogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    })


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username: username.value, password: password.value
            })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedInBlogAppUser', JSON.stringify(user)
            )
            setUser(user)
            username.onReset()
            password.onReset()
        } catch (exception) {
            username.onReset()
            password.onReset()

            props.showNotification('wrong username or password', 5)
        }
    }
    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem(
            'loggedInBlogAppUser', JSON.stringify(user)
        )
        window.location.reload()
    }



    const loginForm = () => (
        <Form onSubmit={handleLogin}>
            <Form.Field>
                <label>käyttäjätunnus</label>
                <input {...username} />
            </Form.Field>
            <Form.Field>
                <label>salasana</label>
                <input {...password} />
            </Form.Field>
            <Button type="submit">kirjaudu</Button>
        </Form>
    )



    if (user === null) {
        return (
            <Container>
                <Notification notification={props.notification} />
                <h2>log in to application</h2>
                {loginForm()}
            </Container>
        )
    }
    return (
        <Container>
            <h2>blogs</h2>
            <div>
                <Notification notification={props.notification} />
                <p>{user.name} logged in</p>
            </div>
            <Button onClick={handleLogout}>logout</Button>
            <h2>create new</h2>
            < NewBlogForm blogs={blogs} setBlogs={setBlogs} showNotification={props.showNotification} />
        </Container>
    )
}

const mapDispatchToProps = {
    showNotification
}

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App)

export default ConnectedApp