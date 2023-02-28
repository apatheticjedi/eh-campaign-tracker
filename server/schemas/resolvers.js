const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Campaign } = require('../models');


const resolvers = {
    Query: {
        me: async (_parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('campaigns')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // Gets data of all users
        users: async () => {
            return await User.find()
                .select('-__v -password')
                .populate('campaigns')
        },
        // Gets data of one user by username
        user: async (parent, { username }) => {
            return await User.findOne({ username })
                .select('-__v -password')
                .populate('campaigns')
        },
        // Gets data of all campaigns
        campaigns: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await Campaign.find(params).sort({ createdAt: -1 });
        },
        // Gets data of one campaign by id
        campaign: async (parent, { _id }) => {
            return await Campaign.findOne({ _id });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
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
        // Adds campaign to database
        addCampaign: async (parent, args, context) => {
            if (context.user) {
                const campaign = await Campaign.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { campaigns: campaign._id } },
                    { new: true }
                );
                return campaign;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addInvestigator: async (parent, { campaignId, name, status, personalStory, darkPact, promisePower }, context) => {
            if (context.user) {
                const updatedCampaign = await Campaign.findOneAndUpdate(
                    { _id: campaignId },
                    { $push: { investigators: { name, status, personalStory, darkPact, promisePower } } },
                    { new: true }
                );

                return updatedCampaign;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addScenario: async (parent, { campaignId, scenario }, context) => {
            if (context.user) {
                const updatedScenarios = await Campaign.findByIdAndUpdate(
                    { _id: campaignId },
                    { $addToSet: { scenarios: scenario } },
                    { new: true }
                ).populate('scenarios');

                return updatedScenarios;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        // Deletes one campaign by the campaign's id
        deleteCampaign: async (parent, args, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { campaigns: args._id } },
                    { new: true }
                );
                const removeCampaign = await Campaign.deleteOne(
                    { _id: args._id }
                )
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;