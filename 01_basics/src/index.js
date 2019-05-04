import { GraphQLServer } from 'graphql-yoga'
import { parseNamedType } from 'graphql/language/parser'
import uuidv4 from 'uuid/v4'

const typeDefs = `
type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
}
        
type Mutation {
    createUser(data: CreateUserInput!): User! 
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
}

input CreateUserInput {
    name: String!, 
    email: String!, 
    age: Int
}

input CreatePostInput {
    title: String!, 
    body: String!, 
    published: Boolean!, 
    author: ID!
}

input CreateCommentInput {
    text: String! 
    author: ID!, 
    post: ID!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment {
    id : ID!
    text: String!
    author: User!
    post: Post!
}
`
// 5 Scalar Types: String, Boolean, Int, Float, ID

const resolvers = {
    

    // Resolvers
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter( (user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            const query = args.query.toLowerCase()

            return posts.filter( (post) => {
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
        comments(parent, args, ctx, info) {
            return comments
        }
    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailAlreadyTaken = users.some( (user) => user.email === args.data.email)
            if (emailAlreadyTaken) {
                throw new Error('Email already taken.')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)

            return user
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex( (user) => user.id === args.id )

            if (userIndex === -1) {
                throw new Error('User not found.')
            }

            const deletedUsers = users.splice(userIndex, 1)
            
            posts = posts.filter( (post) => {
                const match = post.author === args.id

                if (match) {
                    comments = comments.filter( (comment) => comment.post !== post.id )
                }

                return !match
            })
            
            comments = comments.filter( (comment) => comment.author !== args.id )
           
            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const authorExists = users.some( (user) => user.id === args.data.author)
            if (!authorExists) {
                throw new Error('Author is not a registered user.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post)

            return post
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex( (post) => post.id === args.id )
            if (postIndex === -1) {
                throw new Error('Post not found.')
            }

            const deletedPosts = posts.splice(postIndex, 1)

            comments = comments.filter( (comment) => comment.post !== args.id )

            return deletedPosts[0]
        },
        createComment(parent, args, ctx, info) {
            const authorExists = users.some( (user) => user.id === args.data.author)
            if (!authorExists) {
                throw new Error('Author is not a registered user.')
            }

            const postPublished = posts.some ( (post) => 
                (post.id === args.data.post) && post.published
            )
            if (!postPublished) {
                throw new Error('Post not publshed.')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }
            comments.push(comment)

            return comment
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex( (comment) => comment.id === args.id )
            if (commentIndex === -1) {
                throw new Error('Comment not found.')
            }

            const deltetedComments = comments.splice(commentIndex, 1)

            return deltetedComments[0]
        }
    },

    // custom resolver functions (for non scalar types: relations)
    Post: {
        author(parent, args, ctx, info) {
            return users.find( (user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter( (comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            
            return posts.filter( (post) => {
                // console.log(`post.author: ${post.author} - post.author.id: ${post.author.id}`)
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter( (comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find( (user) => {
                return user.id === parent.author
            })
        },
        post (parent, args, ctx, info) {
            return posts.find( (post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({ 
    typeDefs,
    resolvers 
}); // argument -> { typeDefs: typeDefs, resolvers: resolvers }

server.start(() => {
    console.log('The server is up!');
});

// Demo data
let users = [
    {
        id: '1',
        name: 'Guenther',
        email: 'guenther@example.com',
        age: 93
    },
    {
        id: '2',
        name: 'Gordon',
        email: 'gordon@example.com'
    },
    {
        id: '3',
        name: 'Mike',
        email: 'mike@example.com',
        age: 17
    }
]

let posts = [
    {
        id: 'p1',
        title: 'Das is Post 1',
        body: 'Ich glaub das nicht.',
        published: true,
        author: '1'
    },
    {
        id: 'p2',
        title: 'Das is Post 2',
        body: 'Der Post ist doof.',
        published: true,
        author: '1'
    },
    {
        id: 'p3',
        title: 'Das is Post 3',
        body: 'Die spinnen wohl?',
        published: true,
        author: '2'
    },
    {
        id: 'p4',
        title: 'Das is Post 4',
        body: 'Bei "das" kommen alle Posts.',
        published: true,
        author: '3'
    }
]

let comments = [
    {
        id: 'c1',
        text: 'Das ist comment 1 von author 1',
        author: '1',
        post: 'p1'
    },
    {
        id: 'c2',
        text: 'Das ist comment 2 von post mit author 1',
        author: '3',
        post: 'p2'
    },
    {
        id: 'c3',
        text: 'Das ist comment 3',
        author: '3',
        post: 'p3'
    },
    {
        id: 'c4',
        text: 'Das ist comment 4',
        author: '3',
        post: 'p4'
    }
]
