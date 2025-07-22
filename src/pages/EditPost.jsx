import {useState} from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client/client.js'
import { useEffect } from 'react'
import './EditPost.css'

const EditPost = ({data}) => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Posts')
            .update({title: post.title, author: post.author, description: post.description})
            .eq('id', id)

        window.location = "/"
    }

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)
        window.location = "/"
    }
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single()

            setPost(data)
        }
        fetchPost()
    }, [id])

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost