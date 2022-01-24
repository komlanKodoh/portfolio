import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: keyof typeof PRESET_THEME;
  effect?: string;
  className?: string;
  children: React.ReactNode;
}

const PRESET_THEME = {
  default: "inline-block py-2 px-8 border-2",
  one: "px-4 py-1 border-2 bg-black text-white shadow",
};

const PRESET_ANIMATION = {
  default: "",
};

const Button: React.FC<Props> = ({
  className,
  children,
  theme,
  effect,
  ...props
}) => {
  const classProp = `inline-block ${PRESET_THEME[theme ?? "default"]} ${
    PRESET_ANIMATION[theme ?? "default"]
  } ${className}`;

  return (
    <button className={classProp} {...props}>
      {children}
    </button>
  );
};

interface PropsLink
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  theme?: keyof typeof PRESET_THEME;
  effect?: string;
  className?: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<PropsLink> = ({
  className,
  children,
  theme,
  effect,
  ...props
}) => {
  const classProp = `inline-block ${PRESET_THEME[theme ?? "default"]} ${
    PRESET_ANIMATION[theme ?? "default"]
  } ${className}`;

  return (
    <a {...props} className={classProp}>
      {children}
    </a>
  );
};

export default Button;
