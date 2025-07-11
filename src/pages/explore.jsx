import { HeartIcon } from "@phosphor-icons/react";
import Layout from "../components/layouts/layout";

export default function Explore() {

  // dummy data cause frontend skeelton creation only for now for frontend defene thing, else we will be hosting images and media for users with nginx server 
  const images = [
    "https://i.pinimg.com/736x/24/26/ed/2426edc8a18359d9cb5392b1b3f2fb0e.jpg",
    "https://i.pinimg.com/736x/9e/92/0f/9e920fb9240464eb2cfcba5cc282632c.jpg",
    "https://i.pinimg.com/1200x/51/f7/b2/51f7b28261595ace6b8018f0b1c5d192.jpg",
    "https://i.pinimg.com/1200x/f4/7c/ef/f47cefc3cbf8915657b5bbd9b2ca58f7.jpg",
    "https://i.pinimg.com/736x/ef/96/ab/ef96abae362c5816678f4168e641568c.jpg",
    "https://i.pinimg.com/736x/6f/e7/35/6fe73502001d8bb96b707c4e9395d82f.jpg",
    "https://i.pinimg.com/1200x/db/ae/7c/dbae7c2e71f8f311e29c46757284b2e8.jpg",
    "https://i.pinimg.com/1200x/0e/f6/7c/0ef67c9921106b902652377541a4cffc.jpg",
    "https://i.pinimg.com/736x/e2/13/ce/e213cef5c988581a5ed9968bc4ae76da.jpg",
    "https://i.pinimg.com/736x/61/63/82/616382e7948349fdf2d9bfbbd2869b5f.jpg",
    "https://i.pinimg.com/736x/41/13/4f/41134f7ae32824ccfdf8fd7fd7cc2333.jpg"
  ];


  const users = [
    "safal726",
    "batista123",
    "laxmanrwat",
    "bibekkafle",
    "safal726",
    "batista123",
    "laxmanrwat",
    "bibekkafle",
    "safal726",
    "batista123",
    "laxmanrwat",
];
const hearts = [12,6,12,34,12,6,12,34,12,6,12];

return (
    <Layout>
      <div className="columns-[375px] gap-1 max-w-[1374px] mx-auto  box-border">
        {images.map((src, index) => (
      <div
      key={index} 
      className="relative mb-1 border-3 border-black group">

      <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full"
            loading="lazy"
          />

          
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent  flex items-end justify-between px-3 
          pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 
          cursor-pointer
          
          select-none" >

            <span className="text-white text-sm">
              {users[index]}
            </span>
            <span className="flex items-center text-white text-sm">
              <HeartIcon size={20} weight="regular" className="mr-1"/>
              {hearts[index]}
            </span>

        
          
          </div> 
      </div>


        ))}
      </div>
    </Layout>
  );
}
