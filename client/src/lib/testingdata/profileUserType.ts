import { ProfileFriendType } from "@/models/User";

export const profileUserTypeTest:ProfileFriendType = {
    username: "MrJennings",
    firstName: "Paul",
    lastName: "Jennings",
    accessLevel: 1,
    profilePicture: "/images/profile_picture_placeholder.png",
    lastOnline: new Date(1695883140660),
    joinDate: new Date(1685683030660)
}

export const profileUserAdminTypeTest:ProfileFriendType = {
  username: "MrJennings",
  firstName: "Paul",
  lastName: "Jennings",
  accessLevel: 3,
  profilePicture: "/images/profile_picture_placeholder.png",
  lastOnline: new Date(1695883140660),
  joinDate: new Date(1685683030660)
}