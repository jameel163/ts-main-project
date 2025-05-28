import { z } from 'zod'

export const createUserSchema =  z.object({
        name: z.string().min(3, "Name is too short"),
        email: z.string().email("Invalid email"),
        phone_no: z
            .string()
            .min(1, 'Mobile number must be at least 10 digits')
            .max(10, 'Mobile number must be at most 15 digits') ,
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        address: z
            .string()
            .min(3,"Invalid Address")
    })
