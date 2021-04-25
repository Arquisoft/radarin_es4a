/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: "welcome",
    icon: "/img/icon/r.png",
    label: "navBar.welcome",
    to: "/welcome"
  },
  {
    id: "myFriends",
    icon: "/img/icon/r.png",
    label: "navBar.myFriends",
    to: "/myFriends"
  },
  {
    id: "friendsMap",
    icon: "/img/icon/r.png",
    label: "navBar.friendsMap",
    to: "/friendsMap"
  },
  {
    id: "settingsRadio",
    icon: "/img/icon/r.png",
    label: "navBar.settingsRadio",
    to: "/settingsRadio"
  }
];

export const AdminNavigationItems = [];

export const ProfileOptions = [
  {
    label: "navBar.logOut",
    onClick: "logOut",
    icon: "lock"
  }
];
