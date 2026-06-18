const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
};