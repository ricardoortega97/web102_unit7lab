import { useState, useEffect } from 'react'
import { supabase } from '../client/client.js'
import Card from '../components/Card'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetechPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*')
                .order('created_at', { ascending: true })

            setPosts(data)
        }
        fetechPosts()
    }, [props])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        betCount={post.betCount}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts