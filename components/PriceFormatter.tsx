import { cn } from "@/lib/utils";

interface Props{
    amount:number | undefined;
    className?:string
}

const PriceFormatter = ({amount,className}:Props) => {
    const formatePrice=new Number(amount).toLocaleString("en-us",{
        currency:"USD",
        style:"currency",
        minimumFractionDigits:2
    })
  return (
    <span className={cn("text-base font-semibold text-gray-600",className)}>{formatePrice}</span>
  )
}

export default PriceFormatter