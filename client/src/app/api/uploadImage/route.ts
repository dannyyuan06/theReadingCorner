import { UploadImageType } from "@/lib/types/fetchTypes/uploadImage";
import User from "@/models/User";
import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";
import { Stream } from "stream";
import { apiMiddleware } from "../middleware";

// @ts-ignore

const credentials = {
  type: process.env.GOOGLE_STORAGE_TYPE!,
  project_id: process.env.GOOGLE_STORAGE_PROJECT_ID!,
  private_key_id: process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID!,
  private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL!,
  client_id: process.env.GOOGLE_STORAGE_CLIENT_ID!,
  auth_uri: process.env.GOOGLE_STORAGE_AUTH_URI!,
  token_uri: process.env.GOOGLE_STORAGE_TOKEN_URI!,
  auth_provider_x509_cert_url:
    process.env.GOOGLE_STORAGE_AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: process.env.GOOGLE_STORAGE_CLIENT_X509_CERT_URL!,
  universe_domain: "googleapis.com",
};

const storage = new Storage({
  projectId: "thereadingcorner",
  credentials: credentials,
});

const bucketName = "testing-profile-pictures";

export async function POST(req: NextRequest) {
  const body: UploadImageType = await req.json();

  const [access, errRes] = await apiMiddleware(req, 0, body.username);
  if (!access) return errRes;

  try {
    // Receive the base64 string in the 'image' field of the request body
    const base64String = body.image;

    if (!base64String) {
      return NextResponse.json({ error: "No image data found.", status: 400 });
    }
    // Create an image buffer which will allow the image to be sent in the correct format
    const imageBuffer = Buffer.from(
      base64String.split(";base64,").pop()!,
      "base64"
    );
    // Set any desired file extension here, depending on the image format
    const gcsFileName = body.username + new Date().valueOf() + ".jpg";
    await storage.bucket(bucketName).file(gcsFileName).save(imageBuffer);

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`;
    return NextResponse.json({ imageUrl });
  } catch (err) {
    return NextResponse.json({ error: `${err}`, status: 400 });
  }
}
