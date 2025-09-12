import Footer from "@/Components/Footer"
import Navbar from "@/Components/Navbar"




export default function Catalogue(){



    return(

        <>
        <section className="text-black/50 bg-black h-auto dark:text-white/50 m-0">
            <img
                id="background"
                className="absolute -left-20 top-0 max-w-[877px] max-h-[850px]"
                src="https://laravel.com/assets/img/welcome/background.svg"/>
            <div className="p-3">
                <Navbar/>
            </div>
            <div className="h-screen">
                <h2 className="text-white text-xl flex justify-center">Page Catalogue</h2>
            </div>
            <Footer/>
        </section>
            
        </>
    )
}