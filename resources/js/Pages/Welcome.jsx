import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';


export default function Welcome({ laravelVersion, phpVersion }) {
  

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 m-0">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px] max-h-[850px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                        <section className='h-screen items-center flex justify-center'>
                            <h1 className="text-white text-xl flex justify-center">
                                <Navbar/>
                            </h1>
                        </section>
                
            </div>
            <Footer/>
        </>
    );
}
