import crypto from 'node:crypto';

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

const createToken = () => crypto.randomBytes(30).toString('base64');

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export const createSession = async (userId) => {
  const accessToken = createToken();
  const refreshToken = createToken();

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });
};

export const clearSessionCookies = (res) => {
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.clearCookie('sessionId', cookieOptions);
};
