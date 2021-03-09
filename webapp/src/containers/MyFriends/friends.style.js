import styled from "styled-components";

import { media } from "../../utils";

export const FriendsWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  min-height: 79vh;
  padding: 60px 0;
`;
export const FriendsContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  ${media.tablet`
    height: 90%;
  `}
  padding: 20px 40px;
`;

export const FriendListItem = styled.li`
  margin-bottom: 10px;
`

export const FriendLink = styled.a`
  margin-right: 5px;
`