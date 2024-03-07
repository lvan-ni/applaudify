import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        'https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId:
        (process.env.GITHUB_CLIENT_ID_LOCAL as string) ||
        (process.env.GITHUB_CLIENT_ID_DEV as string) ||
        (process.env.GITHUB_CLIENT_ID_PROD as string),
      clientSecret:
        (process.env.GITHUB_CLIENT_SECRET_LOCAL as string) ||
        (process.env.GITHUB_CLIENT_SECRET_DEV as string) ||
        (process.env.GITHUB_CLIENT_SECRET_PROD as string),
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      authorization: {
        params: { scope: 'openid profile email' },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};
