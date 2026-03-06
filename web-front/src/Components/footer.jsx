import { FaFacebook,FaInstagram,FaWhatsapp,FaTiktok} from "react-icons/fa"


export default function Footer(){
    return(<>
      <footer className="fixed bottom-0 left-0 rigth-0 w-full bg-blue-100 text-center p-4">
        <p className="font-bold py-1">&copy; the view optique vison</p>
        <p className="mb-1">Dakar-Libreville-Douala</p>
        <hr className="w-1/2 mb-1 mx-auto"/>
        <div className="flex justify-center items-center " >
            <a href="https://www.facebook.com/share/1BY4VEBJjR/?mibextid=wwXIfr">
                <FaFacebook className="w-17" color="blue"/>
            </a>
            <a href="https://www.instagram.com/theviewoptiquevision_gabon?igsh=MTFqMDZ6OW9ob3pkZA%3D%3D&utm_source=qr">
                <FaInstagram className="w-17" color="red"/>
            </a>
            <a href="https://wa.me/c/24176572840">
                <FaWhatsapp className="w-17" color="green"/>
            </a>
            <a href="https://www.tiktok.com/@theviewoptiquevision?_r=1&_t=ZM-91wi7FkZ4UG">
                <FaTiktok className="w-17" color="black"/>
            </a>
            
        </div>
      </footer>
    </>)
}