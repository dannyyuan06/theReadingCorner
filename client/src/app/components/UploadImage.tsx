'use client'
import Image from 'next/image';
import styles from './UploadImage.module.css'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { UploadImageType } from '@/lib/types/fetchTypes/uploadImage';

const fileTypes = ["JPG", "PNG", "WEBP"];

export function UploadImage({upload, size, aspectRatio, image}: {upload: (reader: FileReader) => Promise<void>, size: number, aspectRatio: number, image?: string}) {

    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(image ?? null);

    function getBase64(file: File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            setSelectedImage(reader.result?.toString())
            await upload(reader)
        };
        reader.onerror = function (error) {
          console.error("error" + error)
        };
     }

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const imageFile = event.target.files[0]
        if (imageFile.size / 1024 < 10) return
        
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: size,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            getBase64(compressedFile)
            
            // await uplo(compressedFile); // write your own logic
        } catch (error) {
            // console.log(error);
        }
        
    };

    return (
        <label className={styles.dragDrop}>
                {
                    !selectedImage ? (
                        <div className={styles.dragDropLabel}>
                            <div className={styles.dragImage}>
                                <Image src='/images/image_placeholder.svg' width={200} height={155} alt='image placeholder' style={{objectFit: 'cover'}}/>
                            </div>
                            <div>
                                Click or Drag a file to this area to upload.
                            </div>
                        </div>
                    ) :
                    <Image src={selectedImage} width={Math.round(200*aspectRatio)} height={200} alt='profile pic' style={{objectFit: 'cover'}}/>
                }
            <input accept=".jpg,.png,.webp" type="file" name="file" onChange={handleImageChange}/>
        </label>
    )
}