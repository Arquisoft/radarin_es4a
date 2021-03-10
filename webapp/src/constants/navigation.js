/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'myFriends',
    icon: '/img/icon/apps.svg',
    label: 'navBar.myFriends',
    to: '/myFriends'
  },
  {
    id: 'friendsMap',
    icon: '/img/icon/apps.svg',
    label: 'navBar.friendsMap',
    to: '/friendsMap'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
