import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType=defineType({
    name:"sale",
    title:"sale",
    type:"document",
    icon:TagIcon,
    fields:[
        defineField({
            name:"title",
            title:"Sale title",
            type:"string",
        }),
        defineField({
            name:"description",
            title:"Sale description",
            type:"text"
        }),
        defineField({
            name:"Badge",
            title:"discount badge",
            type:"string",
            description:"Discount badge ratio"
        }),
        defineField({
            name:"discountAmount",
            title:"Discount Amount",
            type:"number",
            description:"Amount off in percentage or fixed value"
        }),
        defineField({
            name:"couponCode",
            title:"Coupon Code",
            type:"string"
        }),
        defineField({
            name:"ValidForm",
            title:"Valid Form",
            type:"datetime"
        }),
        defineField({
            name:"InvalidUntil",
            title:"Invalid Until",
            type:"datetime"
        }),
        defineField({
            name:"isActive",
            title:"IS Active",
            type:"boolean",
            description:"Toggle to activate/deactivate the sale",
            initialValue:true
        }),
        defineField({
            name: "productImage",
            title: "Product Image",
            type: "image",
            options: {
                hotspot: true,
              },
            validation:(Rule)=>Rule.required()
        })
    ],
    preview:{
        select:{
            title:"title",
            discountAmount:"discountAmount",
            couponCode:"couponCode",
            isActive:"isActive"
        },
        prepare(select){
            const {title,discountAmount,couponCode,isActive}=select
            const status=isActive ? "Active":"Inactive"
            return{
                title,
                subtitle:`${discountAmount}% off -code:${couponCode} -${status} `
            }
        }
    }
})