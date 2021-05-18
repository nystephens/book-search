// const { User } = require('../models')
// const { AuthenticationError } = require('apollo-server-express');

// const { signToken } = require('../utils/auth');

// const resolvers = {
//     Query: {
//         me: async (parent, args, context) => {
//             if (context.user) {
//                 const userData = await User.findOne({ _id: context.user._id })
//                     .select('-__v -password')
//                 return userData;
//             }
//             throw new AuthenticationError('Not logged in');
//         }
//     },
//     Mutation: {
//         addUser: async (parent, args) => {
//             const user = await User.create(args);
//             const token = signToken(user);

//             if (!user) {
//                 return res.status(400).json({ message: 'Error: Please check user credentials.' });
//             }

//             return { token, user };
//         },
//         login: async (parent, { email, password }) => {
//             const user = await User.findOne({ email });

//             if (!user) {
//                 throw new AuthenticationError('Incorrect credentials');
//             }

//             const correctPw = await user.isCorrectPassword(password);

//             if (!correctPw) {
//                 throw new AuthenticationError('Incorrect credentials');
//             }

//             const token = signToken(user);
//             return { token, user };
//         },
//         saveBook: async (parent, { bookData }, context) => {
//             if (context.user) {
//                 const updatedUser = await User.findByIdAndUpdate(
//                     { _id: context.user._id },
//                     { $addToSet: { savedBooks: bookData } },
//                     { new: true, runValidators: true }
//                 );
//                 return updatedUser;
//             }

//             throw new AuthenticationError('You need to be logged in to add a book!');
//         },
//         removeBook: async (parent, { user, bookId }, context) => {
//             if (context.user) {
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: user._id },
//                     { $pull: { savedBooks: { bookId: bookId } } },
//                     { new: true }
//                 );
//                 return updatedUser;
//             }

//             throw new AuthenticationError('You need to be logged in to remove a book!')
//         }
//     }
// };

// module.exports = resolvers;


// Alex's code

const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { removedBook: bookId } },
                    { new: true, runValidators: true }
                );
                return updateBook;
            }
            throw new AuthenticationError("You must be loggedin!");
        },
    },
};
module.exports = resolvers;

