import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const Post = ({ id }) => {

    const getPost = async () => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return data
    }

    const { status, data, isFetching } = useQuery(`post-${id}`, getPost)

    if (status === 'loading') {
        return <div>loading...</div>
    }

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            { isFetching && <p>updating...</p>}
            <br />
            <NavLink to="/">Home</NavLink>
        </div>
    )
}

export default Post