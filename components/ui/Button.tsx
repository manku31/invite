import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`button ${className}`} {...props} />;
}
export function ButtonLink({
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`button ${className}`} {...props} />;
}
