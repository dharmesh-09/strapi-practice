module.exports = ({ env }) => ({
  auth: {
    secret: 'xT5hfo1hG62LVYp9w2ZsZA==',
  },
  apiToken: {
    salt: 'mcUUVvv+BUfOlUEygznkAA==',
  },
  transfer: {
    token: {
      salt: 'Qrg80Z7tujxJFBjVwkZWAg==',
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
