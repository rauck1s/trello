import * as process from 'process';

export const configuration = () => ({
  JWT_SECRET: process.env.JWT_SECRET,
});
