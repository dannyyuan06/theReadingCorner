import { useState } from "react";
import { SearchFriends, SearchProfile } from "./SearchFriends";
import { userWithFriendid } from "@/models/User";
import { profileUserTypeTest } from "@/lib/testingdata/profileUserType";
import profileMiniStyle from "../..components/ProfileMini.module.css";

const userWithFriendidTest:userWithFriendid = {
  friendid: ["danny", "danny"],
  username: "testuser",
  accessLevel: 1,
  joinDate: new Date(818035920000),
  profilePicture: "/images/profile_picture_placeholder.png",
  firstName: "Test",
  lastName: "User",
  lastOnline: new Date(1695883140660)
}

const friend = {
  username: "testuser",
  setRequestPendingFriends: useState<userWithFriendid[]>([userWithFriendidTest])[1],
  allFriends: ["othertestuser"]
};

describe("SearchFriends component", () => {
  it("should render the search box", () => {
    const component = <SearchFriends {...friend}/>;
    cy.mount(component);

    cy.get("input.searchBox").should("exist");
  });

  it("should render an error message if the search term is less than 8 characters", () => {
    const component = <SearchFriends {...friend}/>;
    cy.mount(component);

    cy.get("input.searchBox").type("abc");
    cy.get("div:contains('Search must be more than 8 characters')").should(
      "exist"
    );
  });

  it("should render a list of friends if the search term is more than 8 characters", () => {
    const component = <SearchFriends {...friend}/>;
    cy.mount(component);

    cy.get("input.searchBox").type("abcdefghijklmnopqrstuvwxyz");
    cy.get("div.searchContainer").should("exist");
  });
});

describe("SearchProfile component", () => {
  it("should render the friend's profile information", () => {

    const component = <SearchProfile {...friend} friend={profileUserTypeTest} />;
    cy.mount(component);

    cy.get(`div.${profileMiniStyle.userName}`).contains(profileUserTypeTest.username);
    cy.get("p").contains(friend.lastOnline);
  });

  it("should render a button to request friendship if the user is not already friends with the friend", () => {

    const component = <SearchProfile {...friend} friend={profileUserTypeTest} />;
    cy.mount(component);

    cy.get("button").contains("REQUEST");
  });

  it("should not render a button to request friendship if the user is already friends with the friend", () => {

    const component = <SearchProfile {...friend} friend={profileUserTypeTest}/>;
    cy.mount(component);

    cy.get("button").should("not.exist");
  });
});
