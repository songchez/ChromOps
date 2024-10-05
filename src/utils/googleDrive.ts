import { google } from "googleapis";
import fs from "fs";

const oauth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID_IMAGE_HOST,
  process.env.AUTH_GOOGLE_SECRET_IMAGE_HOST,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

export async function uploadToDrive(file: {
  originalname: string;
  mimetype: string;
  path: string;
}): Promise<string> {
  const fileMetadata = {
    name: file.originalname,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // 환경 변수로 폴더 ID 설정
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
}
