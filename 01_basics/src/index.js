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
            return 1993;
        },
        rating() {
            return null;
        },
        inStock() {
            return true;
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers }); // argument -> { typeDefs: typeDefs, resolvers: resolvers }

server.start(() => {
    console.log('The server is up!');
});