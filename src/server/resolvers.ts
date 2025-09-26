const resolvers = {
  Query: {
    recommendations: (_, { activities }: { activities: string[] }) => {
      const response = [
        { key: 'SKIING', ranking: 10.0 },
        { key: 'SURFING', ranking: 90.0 },
        { key: 'OUTDOOR_SIGHTSEEING', ranking: 90.0 },
        { key: 'INDOOR_SIGHTSEEING', ranking: 10.0 },
      ];
      return response.filter((item) => activities.find((activity) => item.key === activity));
    },
  },
};

export default resolvers;
