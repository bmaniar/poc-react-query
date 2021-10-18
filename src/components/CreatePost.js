import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')
    const queryClient = useQueryClient()

    const createPost = async () => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts')
        setMessage(response.data)
    }

    const { isLoading, isSuccess, isError, error, mutate } = useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts')
        }
    })

    const onSubmit = async () => {
        mutate({ id: Date.now(), title, description })
    }

    return (
        <div className='container'>
            <h1>Create a Post</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <label>Description:</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={onSubmit} >Create Post</button>
            <br />
            {
                isSuccess && <p> Created a new Post ID: {message && message.id}</p>
            }
            {isLoading && "Creating New Post..."}
            {
                isError
                    ? error.message : ""
            }
        </div>
    )
}

export default CreatePost