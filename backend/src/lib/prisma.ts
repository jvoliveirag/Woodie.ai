import { PrismaClient } from "@prisma/client";
require('dotenv').config({ path: './.env' });

export const prisma = new PrismaClient()