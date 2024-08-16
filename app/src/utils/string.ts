export function getBrowserName(userAgent: string): string {
  if (userAgent.includes("Firefox")) {
    return "Mozilla Firefox";
  } else if (userAgent.includes("SamsungBrowser")) {
    return "Samsung Internet";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  } else if (userAgent.includes("Edge")) {
    return "Microsoft Edge (Legacy)";
  } else if (userAgent.includes("Edg")) {
    return "Microsoft Edge (Chromium)";
  } else if (userAgent.includes("Chrome")) {
    return "Google Chrome or Chromium";
  } else if (userAgent.includes("Safari")) {
    return "Apple Safari";
  } else {
    return "unknown";
  }
}

export const slugify = (...args: string[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};
