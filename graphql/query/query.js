const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');
const { dbFindEventHelper, dbFindAllEventHelper } = require('../../database/helper/db_event');
const { dbLoginUserHelper, dbFindUserHelper, dbFindAllUserHelper } = require('../../database/helper/db_user');
const { AuthType, LoginType, UserType, EventType } = require('../types/types');

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    //Login
    login: {
      type: AuthType,
      description: 'A login to app',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const token = await dbLoginUserHelper({
          email: args.email,
          password: args.password,
        });
        return Promise.resolve({token:token});;
      },
    },
    //Get User By Id
    getUser: {
      type: UserType,
      description: 'Get User Details',
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args,req) => {
        if (!req.isAuthenticated) {
          return Promise.reject(new Error('Unauthorized'));
        }
        const user = await dbFindUserHelper({
          userId: args.userId,
        });
        return Promise.resolve(user);;
      },
    },
    //Get All User
    getAllUser: {
      type: new GraphQLList(UserType),
      description: 'Get All User Details',
      resolve: async (parent, args, req) => {
        if (!req.isAuthenticated) {
          return Promise.reject(new Error('Unauthorized'));
        }
        const user = await dbFindAllUserHelper();
        return Promise.resolve(user);;
      },
    },
    //Get Event By Id
    getEvent:{
      type: EventType,
      description: 'Get Event By Id',
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args,req) => {
        if (!req.isAuthenticated) {
          return Promise.reject(new Error('Unauthorized'));
        }
        const event = await dbFindEventHelper({
          eventId: args.eventId,
        });
        return Promise.resolve(event);;
      },
    },
    //Get All Events
    getAllEvents:{
      type: new GraphQLList(EventType),
      description: 'Get All Events',
      resolve: async (parent, args,req) => {
        if (!req.isAuthenticated) {
          return Promise.reject(new Error('Unauthorized'));
        }
        const event = await dbFindAllEventHelper();
        return Promise.resolve(event);;
      },
    }
  }),
});

module.exports = { rootQuery };
