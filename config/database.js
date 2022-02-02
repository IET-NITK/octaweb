module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connection: {
    client: 'sqlite',
    connector: 'bookshelf',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});
