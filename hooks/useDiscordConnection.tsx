import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import * as DiscordAPI from "../interface/discord";
import * as ApelloAPI from "../interface/apello";

type DiscordAccount = {
  id: string;
  avatar: string;
  username: string;
  globalName: string;
};

const DiscordContext = createContext({});

export function useDiscordConnection() {
  return useContext(DiscordContext);
}

export function DiscordProvider({ children }) {
  const router = useRouter();
  const { token, wallet } = useAuthContext();
  const [user, setUser] = useState<DiscordAccount | null>(null);

  const { accessToken, tokenType } = useMemo(() => {
    const discordParams = router.asPath?.split("#").at(-1);
    if (!discordParams)
      return {
        accessToken: null,
        tokenType: null,
      };

    const fragment = new URLSearchParams(discordParams);
    return {
      accessToken: fragment.get("access_token"),
      tokenType: fragment.get("token_type"),
    };
  }, [token]);

  useEffect(() => {
    if (!accessToken || !token) return;

    async function linkDiscordUser() {
      const response = await DiscordAPI.getCurrentUser(tokenType, accessToken);

      const discordAccount = {
        id: response.data.id,
        username: response.data.username,
        globalName: response.data.global_name,
        avatar: response.data.avatar,
      };

      await ApelloAPI.linkDiscord(token, wallet, discordAccount);

      setUser(discordAccount);

      router.replace("/holder", "", { shallow: true });
    }

    linkDiscordUser();
  }, [accessToken, token]);

  return (
    <DiscordContext.Provider value={user}>{children}</DiscordContext.Provider>
  );
}
