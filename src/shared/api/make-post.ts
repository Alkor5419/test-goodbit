import { mainUrl, headers } from "./constants";

export const makePost = async (post: Post, id: number) => {
  const url = `${mainUrl}/posts`;
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({ id, ...post }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};

type Post = {
  title: string;
  body: string;
};
