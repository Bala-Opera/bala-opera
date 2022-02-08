const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://www.balaopera.com';
export const bucket = 'https://bala-opera.s3.amazonaws.com/public';