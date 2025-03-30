"use client";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PiCaretUpDownBold } from "react-icons/pi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
interface Props {
  categories: Category[];
}

const CategorySelector = ({ categories }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between cursor-pointer"
        >
          {value
            ? categories?.find((category) => category?._id === value)?.title
            : "Filter by Category"}
          <PiCaretUpDownBold />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="search categories..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No Categories found</CommandEmpty>
            <CommandGroup>
              {categories?.map((category) => (
                <CommandItem
                  className=" cursor-pointer"
                  key={category?._id}
                  value={category?.title}
                  onSelect={() => {
                    setValue(value === category?._id ? category?._id : "");
                    router.push(`/categories/${category?.slug?.current}`);
                  }}
                >
                  {category?.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;
