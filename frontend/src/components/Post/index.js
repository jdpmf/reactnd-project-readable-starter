import React from 'react'
import {Link} from 'react-router-dom'

const Post = ({post}) => {

    const pathDetails = `/${post.id}`
    const pathCategory = `/${post.category}`

    return (
        <div className="post" key={post.id}>

            <h2 className="title"><Link to={pathDetails}>{post.title} </Link></h2>

            <div className="meta">

                Postado por <a>{post.author}</a> na categoria <Link to={pathCategory}>{post.category}</Link> em {new Date(post.timestamp).toLocaleDateString("pt-BR")}
                &nbsp;&bull;&nbsp;

                <Link to={pathDetails}>Comentários ({post.commentCount})</Link>
                &nbsp;&bull;&nbsp;

                <Link to={pathDetails}>Score: {post.voteScore}</Link>

            </div>

            <div className="entry">

                <p>{post.body}</p>

                <Link to={pathDetails}><button className="buttoncolor">Ver mais</button></Link>

            </div>

            <div className="espace">&nbsp;</div>

        </div>
    )
}


export default Post