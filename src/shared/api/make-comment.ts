import { mainUrl, headers } from "./constants";

export const makeComment = async (
  postId: number,
  text: string
) => {
  const url = `${mainUrl}/comments`;
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({ postId, text }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
