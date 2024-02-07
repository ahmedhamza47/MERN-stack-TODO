import axios, { RawAxiosRequestHeaders } from "axios";
import { toast } from "react-toastify";

export const apiRequest = async (
  url: string,
  method: string,
  body?: object
) => {
  const token = localStorage.getItem("token");
  const updatedUrl = "http://localhost:3000" + url;
  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `${token}`;
  }
  if (updatedUrl) {
    try {
      const response = await axios.request({
        url: updatedUrl,
        method,
        data: body,
        headers,
      });
      if (response.status === 403) {
        toast.error("Token is Expired");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err, "err");
      if (err?.response?.status === 403) {
        toast.error("Token is Expired");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }
};
// Path: front-end/src/ApiRequest/apiRequest.ts
// Compare this snippet from front-end/src/getToken.ts:
// export const getToken = () => {
