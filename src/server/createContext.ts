import { NextApiRequest, NextApiResponse } from "next";

import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { prisma } from '../utils/prisma';

export async function createContext({req, res}:{req:NextApiRequest, res:NextApiResponse}) {
  const session = req && res && (await getServerSession(req, res, nextAuthOptions));
   return {req, res, session, prisma};
}

export type Context = ReturnType<typeof createContext>;