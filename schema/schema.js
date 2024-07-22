import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { categories, products } from "../simpleData.js";
import CategoryModel from "../db/models/category.model.js";

const userTypes = new GraphQLObjectType({
  name: "userTypes",
  fields: {
    id: {
      type: GraphQLFloat,
    },
    age: {
      type: GraphQLFloat,
    },
    name: {
      type: GraphQLString,
    },
  },
});

const categoriesTypes = new GraphQLObjectType({
  name: "categoriesTypes",
  fields: {
    _id: {
      type: GraphQLFloat,
    },
    name: {
      type: GraphQLString,
    },
  },
});

const productTypes = new GraphQLObjectType({
  name: "productTypes",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    imgUrl: { type: GraphQLString },
    categoryId: {
      type: categoriesTypes,
      resolve: (parent, args) => {
        return categories.find((ele) => ele.id == parent.categoryId);
      },
    },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    sayHi: {
      type: GraphQLString,
      resolve: () => {
        return "hi";
      },
    },
    calc: {
      type: GraphQLFloat,
      args: {
        num: {
          type: GraphQLFloat,
        },
      },
      resolve: (parent, args) => {
        return 2 * args.num;
      },
    },
    sum: {
      type: GraphQLFloat,
      args: {
        num1: {
          type: GraphQLFloat,
        },
        num2: {
          type: GraphQLFloat,
        },
      },
      resolve: (parent, args) => {
        return args.num1 + args.num2;
      },
    },
    users: {
      type: userTypes,

      resolve: () => {
        return {
          id: 1,
          age: 22,
          name: "nour",
        };
      },
    },
    products: {
      type: new GraphQLList(productTypes),
      resolve: () => {
        return products;
      },
    },
    categories: {
      type: new GraphQLList(categoriesTypes),
      resolve: async () => {
        let allData = await CategoryModel.find({});
        return allData;
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  args: {
    name: { type: GraphQLString },
  },
  fields: {
    addCatgeory: {
      type: GraphQLString,
      resolve: async (parent, args) => {
        await CategoryModel.insertMany(args);
        return Done;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
