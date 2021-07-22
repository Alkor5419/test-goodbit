import { mainUrl } from "./constants";

export const delComment = async (id: number) => {
  const url = `${mainUrl}/comments/${id}`;
  const requestOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
