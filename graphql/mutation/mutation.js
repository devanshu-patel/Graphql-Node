const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { dbCreateEventHelper } = require("../../database/helper/db_event");
const { dbCreateUserHelper, dbFindUserAndUpdateHelper, dbFindUserHelper } = require("../../database/helper/db_user");
const { UserType, EventType } = require("../types/types");
const events = [];
const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation",
  fields: () => ({
    //Add New User
    addUser: {
      type: UserType,
      description: "Add a User",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, req) => {
        let user = await dbCreateUserHelper({
          email: args.email,
          password: args.password,
        });
        return Promise.resolve(user);
      },
    },
    //Create Event
    createEvent: {
      type: EventType,
      description: "Add a new event",
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, req) => {
        if (!req.isAuthenticated) {
          return Promise.reject(new Error('Unauthorized'));
        }
        let event = await dbCreateEventHelper({
          title: args.title,
          description: args.description,
          price: args.price,
          date: new Date(args.date),
          creator:req.payload.userId,
        });
        const user = await dbFindUserHelper({
          userId: req.payload.userId,
        });
        
        events.push(event._id);
        await dbFindUserAndUpdateHelper({_id:req.payload.userId},{createdEvents:events});
        return Promise.resolve(event);
      },
    },
  }),
});

module.exports = { rootMutation };
