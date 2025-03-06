"use client";

import axios from "axios";

export const fetchFile = async <T = any>(url: string) => {
  const basePath = window?.["basePath" as any] ?? "";
  try {
    return axios.get<T>(`${basePath}${url}`);
  } catch (e) {
    throw e;
  }
};
