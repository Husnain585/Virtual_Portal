// src/utils/helpers.js
import dayjs from "dayjs";
import { DATE_FORMAT, DATETIME_FORMAT } from "./constants";

export const formatDate = (date) => dayjs(date).format(DATE_FORMAT);
export const formatDateTime = (date) => dayjs(date).format(DATETIME_FORMAT);

export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const truncateText = (text, max = 100) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const sortByDate = (arr = [], key = "createdAt", desc = true) => {
  return arr.sort((a, b) =>
    desc
      ? new Date(b[key]) - new Date(a[key])
      : new Date(a[key]) - new Date(b[key])
  );
};

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
