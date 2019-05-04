const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter( (user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }

        const query = args.query.toLowerCase()

        return db.posts.filter( (post) => {
            return post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
        })
        
    },
    me() {
        return {
            id: 'abc123',
            name: 'Panda',
            email: 'panda@zoo.uk',
            age: 28
        }
    },
    post() {
        return {
            id: 'post11122233',
            title: 'My First Post',
            body: 'This is the body of my first post.',
            published: true
        }
    },
    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export default Query
