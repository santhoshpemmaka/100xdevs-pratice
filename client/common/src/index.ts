import z from 'zod';

const signObject = z.object({
    email: z.string(),
    password : z.string()
})

export type SignupType = z.infer<typeof signObject>;