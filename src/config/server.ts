const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://bala-opera.vercel.app';
export const bucket = 'https://bala-opera.s3.amazonaws.com/public';