module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4c9f5dcd729faa53b4d2cf268bef5fa6'),
  },
});
