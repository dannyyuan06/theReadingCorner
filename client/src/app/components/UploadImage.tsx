"use client";
import Image from "next/image";
import styles from "./UploadImage.module.css";
import {
  ChangeEvent,
  useState,
} from "react";
import imageCompression from "browser-image-compression";

export function UploadImage({
  upload,
  size,
  aspectRatio,
  image,
}: {
  upload: (reader: FileReader) => Promise<void>;
  size: number;
  aspectRatio: number;
  image?: string;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    image ?? null
  );
  // Turn into a base 64 string
  function getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectedImage(reader.result?.toString());
      await upload(reader);
    };
    reader.onerror = function (error) {
      console.error("error" + error);
    };
  }
  // Called when the image is uploaded
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const imageFile = event.target.files[0];
    if (imageFile.size / 1024 < 10) return;
    // compression options
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: size,
      useWebWorker: true,
    };
    try {
      // compress file
      const compressedFile = await imageCompression(imageFile, options);
      // turn into base 64 file.
      getBase64(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <label className={styles.dragDrop}>
      {!selectedImage ? (
        <div className={styles.dragDropLabel}>
          <div className={styles.dragImage}>
            <Image
              src="/images/image_placeholder.svg"
              width={200}
              height={155}
              alt="image placeholder"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>Click or Drag a file to this area to upload.</div>
        </div>
      ) : (
        <Image
          src={selectedImage}
          width={Math.round(200 * aspectRatio)}
          height={200}
          alt="profile pic"
          style={{ objectFit: "cover" }}
        />
      )}
      <input
        accept=".jpg,.png,.webp"
        type="file"
        name="file"
        onChange={handleImageChange}
      />
    </label>
  );
}
