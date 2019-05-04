const User = {
    posts(parent, args, { db }, info) {
        
        return db.posts.filter( (post) => {
            // console.log(`post.author: ${post.author} - post.author.id: ${post.author.id}`)
            return post.author === parent.id
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments.filter( (comment) => {
            return comment.author === parent.id
        })
    }
}

export default User