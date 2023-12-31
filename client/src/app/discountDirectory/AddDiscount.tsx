"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Popup } from "../components/Popup";
import styles from "../meetings/AddMeeting.module.css";
import { UploadImage } from "../components/UploadImage";
import { DiscountType } from "@/lib/types/fetchTypes/discount";
import { useRouter } from "next/navigation";

type NameTypes =
  | "title"
  | "imageLink"
  | "description"
  | "code"
  | "startDate"
  | "expireDate"
  | "link";

export function AddDiscount() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const todayDate = new Date();
  todayDate.setMilliseconds(0);
  const [formData, setFormData] = useState({
    title: "",
    imageLink: "",
    description: "",
    code: "",
    startDate: todayDate,
    expireDate: todayDate,
    link: "",
  });

  const uploadedImage = async (reader: FileReader) => {
    const req = {
      image: reader.result ? reader.result.toString() : "",
    };
    const res = await fetch("/api/discountDirectory/image", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    const body = await res.json();
    setFormData((prev) => ({ ...prev, imageLink: body.imageUrl }));
  };

  const confirm = async () => {
    if (
      formData.title === "" ||
      formData.expireDate === null ||
      formData.startDate === null ||
      formData.code === ""
    )
      return;
    const req: DiscountType = formData;
    await fetch(`/api/discountDirectory`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <>
      <div className={styles.container} data-testid="add-discount">
        <button className={styles.button} onClick={() => setClicked(true)}>
          ADD DISCOUNT
        </button>
      </div>

      {clicked && (
        <Popup title="ADD DISCOUNT" setClicked={setClicked} confirm={confirm}>
          <form className={styles.popupWrapper}>
            <Field
              name="title"
              type="text"
              setFormData={setFormData}
              formData={formData}
            >
              TITLE
            </Field>
            <Field
              name="code"
              type="text"
              setFormData={setFormData}
              formData={formData}
            >
              CODE
            </Field>
            <div className={styles.field}>
              <label htmlFor="start-date">
                <h2>START DATE</h2>
              </label>
              <input
                type="datetime-local"
                id="start-date"
                name="start-date"
                defaultValue={formData.startDate.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: new Date(e.target.value),
                  }))
                }
              />
            </div>
            <hr />
            <div className={styles.field}>
              <label htmlFor="expire-date">
                <h2>EXPIRE DATE</h2>
              </label>
              <input
                type="datetime-local"
                id="expire-date"
                name="expire-date"
                defaultValue={formData.startDate.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expireDate: new Date(e.target.value),
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
                    upload={uploadedImage}
                    size={1080}
                    aspectRatio={2}
                  />
                </div>
              </div>
            </div>
          </form>
        </Popup>
      )}
    </>
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
  setFormData: Dispatch<SetStateAction<DiscountType>>;
  formData: DiscountType;
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
