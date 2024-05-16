import axios from "axios";

const redirectURL = () => {
  let origin = encodeURIComponent(window.location.origin.replace("www.", ""));
  return `https://discord.com/api/oauth2/authorize?client_id=990757313390465114&redirect_uri=${origin}%2Fholder&response_type=token&scope=identify`;
};

export function authorize() {
  window.open(redirectURL(), "_self");
}

export function avatarURL(account) {
  return `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}`;
}

export function getCurrentUser(tokenType, token) {
  return axios.get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
}
