import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const SearchBox = (props : Props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10 text-neutral-400 ",
        props.className
        
      )}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Cities.."
        className="rounded-3xl border border-neutral-800 focus:ring-1 focus:ring-teal-500  w-full relative z-10   bg-neutral-950 placeholder:text-neutral-400  placeholder:text-center p-2 rounded-r-none"
      />
      <button className="px-4 py-[9px] border  border-blue-500 bg-blue-500 text-white  focus:outline-none hover:bg-blue-600  h-full rounded-3xl rounded-l-none">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
