import { images } from "@/assets/images/images";
import Image, { StaticImageData } from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  scale?: number;
  className?: string;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fill,
  className,
  scale,
}) => {
  const image: PartialBy<StaticImageData, "height" | "width"> = images[src];

  const imageProps = {
    ...image,
  };

  if (fill) {
    delete imageProps.width;
    delete imageProps.height;
  }

  if (scale) {
    if (imageProps.width) imageProps.width *= scale;
    if (imageProps.height) imageProps.height *= scale;
  }

  return <Image {...imageProps} alt={alt} fill={fill} className={className} />;
};
