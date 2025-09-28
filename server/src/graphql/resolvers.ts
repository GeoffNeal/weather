import { ApolloContext } from '../../index';
import type { Recommendation, Recommendations, Resolvers } from '../../generated/gql';
import ActivityFactory from '../internal/factories/ActivityFactory';
import { getErrorMessage } from '../utils';

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    /**
     * Generate recommendations for activities for the provided city based
     * on the weather in that area.
     *
     * @param _
     * @param args
     * @param context
     * @returns {Promise<Recommendations[]>} A Promise that resolves to a list of cities that match the input and their activity recommendations
     */
    recommendations: async (_, { input }, { dataSources }): Promise<Recommendations[]> => {
      try {
        const { name, activities, days = '7' } = input;
        const { results } = await dataSources.geocodingAPI.getCityData(name);

        if (!results) return [];

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
      } catch (e: unknown) {
        // Here we would probably want to do some logging to whatever
        // cloud provider we're running this instance in. For now I'm
        // just going to console.log

        // eslint-disable-next-line no-console
        console.log('Error: ', getErrorMessage(e));

        return [];
      }
    },
  },
};

export default resolvers;
