import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import CreatePost from './CreatePost'

const getPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return data
}

function Home() {
    const { data, error, isError, isLoading, isFetching } = useQuery('posts', getPosts)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }

    return (
        <div className='container'>
            <CreatePost />
            <h1>Posts List</h1>
            {
                data &&
                <ul>
                    {
                        data
                            .slice(0, 20)
                            .map((post) => (
                                <li key={`post-${post.id}`}>
                                    <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
                                </li>
                            ))
                    }
                </ul>
            }
            { isFetching && <p>updating data...</p>}
        </div >
    );
}

export default Home