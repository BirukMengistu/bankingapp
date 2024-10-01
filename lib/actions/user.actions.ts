'use server'

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
const {
APPWRITE_DATABASE_ID: DATABASE_ID,
APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
      const { database } = await createAdminClient();
  
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

export const signIn = async (data: signInProps) => {

    try {
        //mutations
        return data
    }
    catch (err) {
        console.error(err)
    }
}


export const signUp = async ({ password, ...userData }: SignUpParams) => {


    const { email, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
             userData.email,
             password,
            `${firstName} ${lastName}`);
    
            if(!newUserAccount) throw new Error('Error creating user')

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    }
    catch (err) {
        console.error(err)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();
  
      const user = await getUserInfo({ userId: result.$id})
  
      return parseStringify(user);
    } catch (error) {
      console.log(error)
      return null;
    }
  }