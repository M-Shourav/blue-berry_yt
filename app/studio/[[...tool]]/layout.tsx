import { Metadata } from "next";

export const metadata: Metadata = {
    title: "blue berry admin ",
    description: "Ecommerce website for bussiness purpose",
  };
const RootLayout=({children}:{children:React.ReactNode})=>{
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout