import { Client, Storage, Databases, ID } from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6627f6891c958d1d0fca",
  databaseId: "6627fd63b14ee0a6deb1",
  driverCollectionId: "66280b25081fd06ee90b",
  storageId: "662818c1b8fa54b423cb",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const storage = new Storage(client);
const databases = new Databases(client);

export const uploadFile = async (file) => {
  try {
    const response = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );
    return response.$id;
  } catch (error) {
    console.error("File upload failed:", error.message);
    throw new Error("Failed to upload file: " + error.message);
  }
};

export const getFileURL = (fileId) => {
  return `${config.endpoint}/storage/files/${fileId}/view?project=${config.projectId}`;
};

export const saveDriverKYC = async (
  plateNumber,
  phoneNumber,
  route,
  photoURL,
  permitURL
) => {
  try {
    const document = await databases.createDocument(
      config.databaseId,
      config.driverCollectionId,
      ID.unique(),
      {
        plateNumber,
        phoneNumber,
        route,
        photoURL,
        permitURL,
      }
    );
    return document;
  } catch (error) {
    console.error("Save driver KYC failed:", error.message);
    throw new Error("Failed to save driver KYC: " + error.message);
  }
};
