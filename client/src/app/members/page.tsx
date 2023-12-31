"use client";
import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import { ProfileStandard } from "./ProfileStandard";
import styles from "./page.module.css";
import { MemberType } from "@/models/User";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default function Members() {
  // States
  const [users, setUsers] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  // To refresh the page
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searched = searchParams.get("search");

  // Function to fetch a member
  const fetchMembers = async (userQuery: string | null) => {
    if (!userQuery) {
      const res = await fetch("/api/users/members", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const body: MemberType[] = await res.json();
      return body ?? [];
    }
    // If there was a query
    const res = await fetch(`/api/users/members/${userQuery}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const body: MemberType[] = await res.json();
    return body ?? [];
  };

  // Runs if the search parameters change
  useEffect(() => {
    setLoading(true);
    fetchMembers(searched).then((users) => {
      setUsers(users);
      setLoading(false);
    });
    if (searched && inputRef.current) {
      inputRef.current.value = searched;
    }
  }, [searched]);

  // Change the search parameter to trigger the above function
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usernameQuery = formData.get("search")!.toString();
    const URLParams = new URLSearchParams({ search: usernameQuery });
    router.push(`/members?${URLParams}`);
  };

  return (
    <div>
      <PageHeader>MEMBERS</PageHeader>
      <div className={styles.searchBar}>
        <Image
          alt="Search Button"
          src="/images/search_icon.svg"
          width={30}
          height={30}
        />
        <form onSubmit={submitHandler} className={styles.searchForm}>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="search"
            name="search"
            results={2}
            placeholder="Search by username"
          />
        </form>
      </div>
      <div className={styles.profilesContainer}>
        {loading && <Loading />}
        <div className={styles.titles}>
          <span style={{ width: 40 }}></span>
          <h3 style={{ flex: 1 }}>USERNAME</h3>
          <h3 style={{ flex: 1 }}>NAME</h3>
          <h3 style={{ flex: 1 }}>DATE JOINED</h3>
          <h3 style={{ flex: 1 }}>LAST ONLINE</h3>
          <h3 style={{ flex: 2 }}>EMAIL</h3>
          <h3 style={{ flex: 1 }}>ACCESS</h3>
          <span style={{ width: 35 }}></span>
        </div>
        {users && users.map((values: MemberType, index: number) => (
          <ProfileStandard
            key={values.username}
            user={values}
            setUsers={setUsers}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
