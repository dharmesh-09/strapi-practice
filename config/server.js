module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: ['VWNqXaC20CgQQzyZ2lsSr6CIbC+5ItQ+4YcWxn3uJ18=', '2xSru/MLa41ElUVcsCHsG1qDZlNYHMRQ0mRVqlT3IJU='],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
