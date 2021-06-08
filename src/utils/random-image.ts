import { imageSrcList } from "../constants/index";

const length = imageSrcList.length;

export const getRandomImageSrc = (): string => {
  const index = Math.floor(Math.random() * length);
  return imageSrcList[index];
};
