const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require("graphql");
const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    createdEvents: { type: new GraphQLList(GraphQLString) },
  }),
});
const LoginType = new GraphQLInputObjectType({
  name: 'Login',
  description: 'Login object for user',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
const AuthType = new GraphQLObjectType({
  name: 'Auth',
  description: 'Auth object for user',
  fields: () => ({
    token: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Event object',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: { type: new GraphQLNonNull(GraphQLString) },
    description:  { type: new GraphQLNonNull(GraphQLString) },
    price:  { type: new GraphQLNonNull(GraphQLInt) },
    date:  { type: new GraphQLNonNull(GraphQLString) },
  }),
});
module.exports = {
  UserType,
  LoginType,
  AuthType,
  EventType,
};