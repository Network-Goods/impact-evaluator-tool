import create from "zustand";
import { v4 as uuid } from "uuid";

import { DocumentType, gql } from "src/gql";
import { graphQLClient } from "./graphqlClient";
import { createUser } from "./dbUtils";
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { Session, SupabaseClient } from "@supabase/supabase-js";

export const UserProfileQuery = gql(/* GraphQL */ `
  query UserProfileQuery($github_user_id: UUID!) {
    user: userCollection(filter: { github_user_id: { eq: $github_user_id } }) {
      edges {
        node {
          id
          preferred_email
        }
      }
    }
  }
`);

export type UserProfileStore = {
  profile?: {
    id: string;
    prefferedEmail?: string;
    userName: string;
    githubHandle: string;
  };
  login: (supabase: SupabaseClient, session: Session) => void;
  logout: () => void;
};

export const useUserProfileStore = create<UserProfileStore>()((set, get) => ({
  login: (supabase: SupabaseClient, session: Session) => {
    const githhubUserId = session.user.id;
    const userName = session.user.user_metadata.full_name;
    const githubHandle = session.user.user_metadata.user_name;

    graphQLClient
      .request(UserProfileQuery, { github_user_id: githhubUserId })
      .then((data) => {
        let userId;
        const user = data.user?.edges[0]?.node;
        if (!user) {
          userId = uuid();
          createUser(supabase, userId, githhubUserId, userName, githubHandle);
          return;
        } else {
          userId = user.id;
        }

        set({
          profile: {
            id: userId,
            userName: userName,
            githubHandle: githubHandle,
          },
        });
      });
  },
  logout: () => {
    set({
      profile: undefined,
    });
  },
}));
