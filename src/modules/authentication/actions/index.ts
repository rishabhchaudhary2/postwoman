'use server';

import { auth } from "@/lib/auth";
import db from "@/lib/db";

import { headers } from "next/headers";

export const currentUser =async ()=>{
    try {
        const session =await auth.api.getSession({
            headers : await headers(),
        })
        if(!session?.user?.id){
            return null
        }
        const user =await db.user.findUnique({
            where :{
                id :session.user.id,
            },
            select:{
                id :true,
                name:true,
                email : true,
                createdAt : true,
                updatedAt :true,
                image: true,

            }

        })

        return user ; 
    }
    catch(e){
            console.error('Error fetching current user:', e);
            return null;
    }
}