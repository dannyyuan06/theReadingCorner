import { PageHeader } from "../components/PageHeader";
import styles from "./page.module.css";
import { DiscountTile } from "./DiscountTile";
import { headers } from "next/dist/client/components/headers";
import { AddDiscount } from "./AddDiscount";
import { Discount } from "@/models/Discount";

export default async function discountDirectory() {
  const headersList = headers();
  const userAccessLevel = parseInt(
    headersList.get("accessLevel")?.toString() ?? ""
  );
  // Get from database with Error handling
  const [discounts, err] = await getDiscounts();

  // Validation
  if (!discounts)
    return (
      <div>
        <PageHeader>DISCOUNTS NOT FOUND</PageHeader>
        <div>Err: {err}</div>
      </div>
    );

  return (
    <div>
      <div className={styles.header}>
        <PageHeader>DISCOUNT DIRECTORY</PageHeader>
        {userAccessLevel === 3 && <AddDiscount />}
      </div>
      <div className={styles.discountContainer}>
        {discounts.map((discount) => (
          <DiscountTile
            key={discount.discountdirectoryid}
            discount={discount}
            accessLevel={userAccessLevel}
          />
        ))}
      </div>
    </div>
  );
}

async function getDiscounts() {
  return Discount.getDiscounts();
}
