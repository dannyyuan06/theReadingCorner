'use client'
import Image from 'next/image';
import styles from './ProfilePicChanger.module.css'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { UploadImageType } from '@/lib/types/fetchTypes/uploadImage';

const fileTypes = ["JPG", "PNG", "WEBP"];

export function ProfilePicChanger({username, setClicked}: {username: string, setClicked: Dispatch<SetStateAction<boolean>>}) {

    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);

    function getBase64(file: File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            setSelectedImage(reader.result?.toString())

            const req:UploadImageType = {
                image: reader.result ? reader.result.toString() : "" ,
                username: username
            }
            const res = await fetch('/api/uploadImage', {
                method: 'POST',
                body: JSON.stringify(req),
                headers: { "Content-Type": "application/json" }
            })
            const body = await res.json()
            console.log(body)
            setClicked(false)
        };
        reader.onerror = function (error) {
          console.log("error" + error)
        };
     }

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const imageFile = event.target.files[0]
        
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
       
        console.log(`originalFile size ${imageFile.size / 1024 } KB`);
        if (imageFile.size / 1024 < 10) return
        
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 } KB`); // smaller than maxSizeMB
            getBase64(compressedFile)
            
            // await uplo(compressedFile); // write your own logic
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className={styles.container}>
            <form className={styles.wrapper}>
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
                            <Image src={selectedImage} width={200} height={200} alt='profile pic' style={{objectFit: 'cover'}}/>
                        }
                    <input accept=".jpg,.png,.webp" type="file" name="file" onChange={handleImageChange}/>
                </label>
            </form>
        </div>
    )
}