import User from "@/models/User"
import { Storage } from "@google-cloud/storage"
import { NextRequest, NextResponse } from "next/server"
import { Stream } from "stream"

const storage = new Storage({
    projectId: 'thereadingcorner',
    keyFilename: './src/service-account-key.json'
})

const bucketName = 'testing-profile-pictures'

export async function POST(req: NextRequest) {
    const body = await req.json()
    
    const base64String = body.image; // Assuming you receive the base64 string in the 'image' field of the request body

    if (!base64String) {
        return NextResponse.json({ error: 'No image data found.', status: 400 });
    }

    const imageBuffer = Buffer.from(base64String.split(';base64,').pop(), 'base64');
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(imageBuffer);
    const gcsFileName = body.username + (new Date()).valueOf() + '.jpg'; // You can set any desired file extension here, depending on the image format
    const bucket = storage.bucket(bucketName);

    const stream = bufferStream.pipe(bucket.file(gcsFileName).createWriteStream({
        metadata: {
            contentType: 'image/jpeg',
            metadata: {
                custom: 'metadata'
            },
        public: true,
    }}));

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`;
    const res = await User.uploadAvatar(body.username, imageUrl)
    return NextResponse.json(res);
}