import { React, useCallback } from "react";
import { X } from "lucide-react";
import cx from "classnames";
import * as Toast from "@radix-ui/react-toast";

const Alert = ({ open, setOpen, title, description }) => {
  const onClick = useCallback(() => setOpen(false), [setOpen]);
  return (
    <Toast.Provider swipeDirection={"right"} duration={3000}>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={cx(
          "group fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[320px] rounded-lg bg-white shadow-lg lg:top-4 lg:right-4 lg:left-auto lg:bottom-auto lg:w-full",
          "state-open:animate-toast-slide-in-right",
          "state-closed:animate-toast-hide",
          "swipe-direction-right:swipe-end:animate-toast-swipe-out-x",
          "swipe-direction-right:translate-x-toast-swipe-move-x",
        )}
      >
        <button
          className="absolute top-0 left-0 flex h-5 w-5 -translate-x-2 -translate-y-2 items-center justify-center rounded-full border bg-white p-0 opacity-0 shadow-lg transition ease-in-out group-hover:opacity-100"
          onClick={onClick}
        >
          <X
            width={14}
            height={14}
            className="text-[#858585] transition ease-in-out hover:text-black"
          />
        </button>
        <div className="flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div>
              <Toast.Title className="text-sm font-semibold text-black">{title}</Toast.Title>
              <Toast.Description className="mt-1 text-sm text-[#858585]">
                {description}
              </Toast.Description>
            </div>
          </div>
        </div>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default Alert;
