import { Client, Account, ID, Databases } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.TransitTracker.TransitTracker",
  projectId: "6627f6891c958d1d0fca",
  databaseId: "6627fd63b14ee0a6deb1",
  userCollectionId: "66280a2d38da896451b5",
  riderCollectionId: "66280b0a6e16eee0fee5",
  driverCollectionId: "66280b25081fd06ee90b",
  storageId: "662818c1b8fa54b423cb",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (fullname, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );
    if (!newAccount) throw new Error("Failed to create new account");

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        email: email,
        fullname: fullname,
        password: password, // WARNING: Plain password storage (use only for testing or proof of concept)!
      }
    );

    return { user: newUser, accountId: newAccount.$id };
  } catch (error) {
    console.error("Create user failed:", error.message);
    throw new Error("Failed to create user: " + error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.error("Sign in failed:", error.message);
    throw new Error("Failed to sign in: " + error.message);
  }
};
