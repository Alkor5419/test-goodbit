import { mainUrl, headers } from "./constants";

export const updateComment = async (
  id: number,
  postId: number,
  text: string
) => {
  //Тут должен быть роут на комменты, но его нет )
  const url = `${mainUrl}/profile`;
  const requestOptions = {
    method: "PUT",
    headers,
    body: JSON.stringify({ id, postId, text }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
