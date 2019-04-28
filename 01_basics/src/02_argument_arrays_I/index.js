import { GraphQLServer } from 'graphql-yoga'

// 5 Scalar Types: String, Boolean, Int, Float, ID

// Type definitions

const typeDefs = `
    type Query {
        greeting(name: String!, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    },
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    },
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.position) {
                return `Hello ${args.name}, you are my favourit ${args.position}.` 
            } else {
                return `Hello! ${args.name}!`
            }
        },
        add(parent, args, ctx, info) {
           if (args.numbers.length === 0){
               return 0
           } else {
               return args.numbers.reduce( (acc, curr) => acc + curr )
           }
        },
        grades(parents, args, ctx, info) {
            return [99, 80, 93]
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
                body: 'This is the body of mu first post.',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers }); // argument -> { typeDefs: typeDefs, resolvers: resolvers }

server.start(() => {
    console.log('The server is up!');
});