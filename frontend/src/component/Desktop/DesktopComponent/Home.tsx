import { WobbleCard } from "@/components/ui/wobble-card.js";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCreative,
  Autoplay,
  Mousewheel
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-cards";
import "swiper/css/bundle";
import { useEffect } from "react";
import axios from "axios";

function Home() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/user/currentuser');
      console.log(response);
    };
    fetchData();
  }, []);




  return (
    <>
    <div className="w-full h-[38%]  bg-green-200 shrink-0 " ></div>
            <div className="w-full h-[48%]  shrink-0 border-box flex flex-row gap-[0.5rem]  overflow-y-hidden" >
            <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
            Mousewheel
          ]}
          speed={400}
          slidesPerView={4}
          // effect="creative"
          // initialSlide={2}
          // slidesOffsetBefore={0}
          // slidesOffsetAfter={0}
          // creativeEffect={{
          //   perspective: true,
          //   prev: {
          //     translate: [-115, 0,-500],
          //   },
          //   next: {
          //     translate: [115, 0,-500],
          //   },
          //   limitProgress: 2,
          // }}
          navigation={true}
          loop={true}
          loopAdditionalSlides={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="text-black flex items-center justify-center h-full w-full"
        >
            <SwiperSlide className="p-[3px] " ><WobbleCard containerClassName=" shrink-0 w-[300px] h-full  bg-white/40 backdrop-blur-3xl"></WobbleCard> </SwiperSlide>

        </Swiper>





















             
              
              </div>
              <div className="w-full h-[38%]  bg-green-200 shrink-0 " ></div>
              <div className=" w-full h-[50px] shrink-0 " ></div>     
    </>
  )
}

export default Home