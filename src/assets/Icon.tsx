import classNames from "classnames";
import { ComponentProps } from "react";

const getModule = (path: string) => {
  try {
    const mo = context(path).default;
    return mo;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const context = require.context("./images/?comp", true, /\.(svg)$/);
const svgs = context
  .keys()
  .filter((x) => x.startsWith("."))
  .reduce(
    (acc: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> }, key) => {
      const image = getModule(key);
      if (!image) return acc;
      acc[key.replace(/^\.\//, "")] = image;
      return acc;
    },
    {},
  );

interface IconProps extends ComponentProps<"svg"> {
  path: string;
}

export const Icon: React.FC<IconProps> = ({ path, className, ...svgProps }) => {
  const Component = svgs[path];

  if (!Component) {
    return null;
  }

  return <Component {...svgProps} className={classNames(className)} />;
};
