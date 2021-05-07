const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const { assertEnumType } = require('graphql');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // is this necessary?
        // getSingleUser: async (parent, username) => {
        //     if (foundUserData) {
        //         const foundUserData = await User.findOne({ username })
        //             .select('-__v -password')
        //             .populate('savedBooks')
        //         return foundUserData;
        //     }
        //     throw new AuthenticationError('No user found.')
        // }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            if (!user) {
                return res.status(400).json({ message: 'Error: Please check user credentials.' });
            }

            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { user, bookId, title, description, author, link, image }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: bookId, title, description, author, link, image } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in to add a book!');
        },
        removeBook: async (parent, { user, bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in to remove a book!')
        }
    }
};

module.exports = resolvers;