import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const positiveMoneySchema = z.number().finite().nonnegative();
