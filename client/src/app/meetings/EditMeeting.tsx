"use client";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./AddMeeting.module.css";
import { UploadImage } from "../components/UploadImage";
import { AddMeetingType } from "@/lib/types/fetchTypes/addMeeting";
import { Meetings } from "@prisma/client";
import { Popup } from "../components/Popup";
import { useRouter } from "next/navigation";

type NameTypes =
  | "title"
  | "host"
  | "dateOfMeeting"
  | "link"
  | "description"
  | "imageLink";

export function EditMeeting({
  meetingDetails,
  setClicked,
}: {
  meetingDetails: Meetings;
  setClicked: Dispatch<SetStateAction<boolean>>;
}) {
  // get the meeting id by object destructuring
  const { meetingid, ...meeting } = meetingDetails;
  const [formData, setFormData] = useState<AddMeetingType>(meeting);

  const uploadedImage = async (reader: FileReader) => {
    const req = {
      image: reader.result ? reader.result.toString() : "",
    };
    // Upload image to storage bucket
    const res = await fetch("/api/meetings/uploadMeetingImage", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    const body = await res.json();
    setFormData((prev) => ({ ...prev, imageLink: body.imageUrl }));
  };

  const submitHandler = async () => {
    // Error checking
    if (formData.title === "" || formData.dateOfMeeting === null) return;
    // Send fetch
    await fetch(`/api/meetings/${meetingid}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Popup title="EDIT MEETING" setClicked={setClicked} confirm={submitHandler}>
      <form className={styles.popupWrapper}>
        <Field
          name="title"
          type="text"
          setFormData={setFormData}
          formData={formData}
        >
          MEETING TITLE
        </Field>
        <Field
          name="host"
          type="text"
          setFormData={setFormData}
          formData={formData}
        >
          HOST
        </Field>
        <div className={styles.field}>
          <label htmlFor="dateOfMeeting">
            <h2>DATE</h2>
          </label>
          <input
            type="datetime-local"
            id="dateOfMeeting"
            name="dateOfMeeting"
            defaultValue={formData.dateOfMeeting.toISOString().slice(0, 19)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateOfMeeting: new Date(e.target.value),
              }))
            }
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <hr />
        <Field
          name="link"
          type="text"
          setFormData={setFormData}
          formData={formData}
        >
          LINK
        </Field>
        <div className={styles.bigContainer}>
          <div className={styles.big}>
            <label htmlFor="description">
              <h2>DESCRIPTION</h2>
            </label>
            <textarea
              name="description"
              rows={6}
              className={styles.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={formData.description}
            ></textarea>
          </div>
          <div className={styles.big}>
            <label htmlFor="description">
              <h2>IMAGE</h2>
            </label>
            <div className={styles.imageUpload}>
              <UploadImage
                image={formData.imageLink}
                upload={uploadedImage}
                size={1080}
                aspectRatio={1.6}
              />
            </div>
          </div>
        </div>
      </form>
    </Popup>
  );
}

function Field({
  name,
  type,
  children,
  setFormData,
  formData,
}: {
  name: NameTypes;
  type: string;
  children: React.ReactNode;
  setFormData: Dispatch<SetStateAction<AddMeetingType>>;
  formData: AddMeetingType;
}) {
  return (
    <>
      <div className={styles.field}>
        <label htmlFor={name}>
          <h2>{children}</h2>
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]?.toString()}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [name]: e.target.value }))
          }
          min={
            type === "datetime-local"
              ? new Date().toISOString().slice(0, 16)
              : ""
          }
        />
      </div>
      <hr />
    </>
  );
}
