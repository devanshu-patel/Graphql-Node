const expressGraphQL = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const { rootQuery } = require("./query/query");
const { rootMutation } = require("./mutation/mutation");

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

module.exports = {
  graphController: expressGraphQL.graphqlHTTP({
    graphiql: true,
    schema,
  }),
};
