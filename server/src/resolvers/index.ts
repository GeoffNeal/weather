import { ApolloContext } from '../../index';
import type { Recommendation, Recommendations, Resolvers } from '../../generated/gql';
import ActivityFactory from '../internal/factories.ts/ActivityFactory';

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    recommendations: async (_, { input }, { dataSources }): Promise<Recommendations[]> => {
      const { name, activities, days = '7' } = input;
      const { results } = await dataSources.geocodingAPI.getCityData(name);

      const recommendations = results.map(
        async ({ latitude: lat, longitude: lon, name: cityName, country_code: countryCode }) => {
          const weather = await dataSources.weatherAPI.getWeatherOverDays(days, { lat, lon });
          const activityList = activities.map((activity) => new ActivityFactory(activity).init());

          const sortedList: Recommendation[] = activityList
            .map((activity) => activity.getRecommendation(weather))
            .sort((a, b) => {
              if (a.ranking > b.ranking) return -1;
              if (a.ranking < b.ranking) return 1;
              return 0;
            });

          return { city: cityName, countryCode, results: sortedList };
        }
      );

      return Promise.all(recommendations);
    },
  },
};

export default resolvers;
