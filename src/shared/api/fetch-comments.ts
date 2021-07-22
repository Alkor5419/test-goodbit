import { mainUrl } from "./constants";

export const fetchComments = async (id: number) => {
  const url = `${mainUrl}/posts/${id}/comments`;
  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
