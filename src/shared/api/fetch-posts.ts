import { mainUrl } from "./constants";

export const fetchPosts = async () => {
  const url = `${mainUrl}/posts`;
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
