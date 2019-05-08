const Subscription = {
    count: {
        subscribe(parent, args, ctx, info) {
            const {pubsub} = ctx
            let count = 0

            setInterval( () => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
            //======================> Channel Name
        }
    },
    comment: {
        subscribe(parent, args, ctx, info) {
            const {postId} = args
            const {db, pubsub} = ctx
            const post = db.posts.find( (post) => post.id === postId && post.published )

            if (!post) {
                throw new Error('Post not found or not published.')
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },
    post: {
        subscribe(parent, args, ctx, info) {
            const {pubsub} = ctx
         
            return pubsub.asyncIterator('post')
        }
    }
}

export default Subscription