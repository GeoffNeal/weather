import { ApolloContext } from '..';
import type { Recommendation, Resolvers } from '../../generated/gql';
import ActivityFactory from '../internal/factories.ts/ActivityFactory';

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    recommendations: async (_, { input }, { dataSources }): Promise<Recommendation[]> => {
      const { coordinates, activities, days = '7' } = input;
      const weather = await dataSources.weatherAPI.getWeatherOverDays(days, coordinates);
      const activityList = activities.map((activity) => new ActivityFactory(activity).init());

      return activityList
        .map((activity) => activity.getRecommendation(weather))
        .sort((a, b) => {
          if (a.ranking > b.ranking) return -1;
          if (a.ranking < b.ranking) return 1;
          return 0;
        });
    },
  },
};

export default resolvers;
