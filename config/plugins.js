module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'xT5hfo1hG62LVYp9w2ZsZA=='), // Use the generated JWT_SECRET here
      },
    },
  });
  