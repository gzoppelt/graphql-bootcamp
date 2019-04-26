import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar Types: String, Boolean, Int, Float, ID

// Type definitions

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
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
        title() {
            return 'Knife';
        },
        price() {
            return 2.50;
        },
        releaseYear() {
            return 1998;
        },
        rating() {
            return null;
        },
        inStock() {
            return true;
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