import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const MainLayout = async ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"main">) => {
  return (
    <main
      className={twMerge(
        "flex-grow",
        className,
      )}
      {...rest}
    >
      {children}
    </main>
  );
};

export default MainLayout;
