import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({
    handleSubmit,
    title,
    author,
    url
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>title</label>
                <input {...title} />
            </Form.Field>
            <Form.Field>
                <label>author</label>
                <input {...author} />
            </Form.Field>
            <Form.Field>
                <label>url</label>
                <input {...url} />
            </Form.Field>
            <Button type="submit">create</Button>
        </Form>
    )
}

export default BlogForm