module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'ozd0mX3nDJ5xy14hI1WSePgQb0zZIK1YOrCk9vQ7Rkc=='), // Use the generated JWT_SECRET here
      },
    },
  });
  