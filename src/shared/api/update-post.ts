import { mainUrl } from "./constants";

export const updatePost = async (
  id: number,
  post: Post
) => {
  const url = `${mainUrl}/posts/${id}`;
  const requestOptions = {
    method: "PUT",
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
