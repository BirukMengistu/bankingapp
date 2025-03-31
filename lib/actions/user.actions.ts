'use server'

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
import { console } from "inspector"



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
      console.log('user',user)  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

export const signIn = async ({email, password} : signInProps) => {

    try {
      
        //mutations
      const { account } = await createAdminClient();
      const response = await account.createEmailPasswordSession(email, password)
      cookies().set("appwrite-session", response.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      //const user = await getUserInfo({userId: response.userId})
      return parseStringify(response);
    
    }
    catch (err) {
        console.error(err)
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession('current');
        cookies().delete('appwrite-session');
        return true;
    }
    catch (err) {
        console.error(err)
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {


    const { email, firstName, lastName } = userData;
    let newUserAccount
    try {
        const { account } = await createAdminClient();
        newUserAccount = await account.create(
            ID.unique(),
             email,
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
      console.log('user',result)
      return parseStringify(result);
    } catch (error) {
      console.log(error)
      return null;
    }
  }
