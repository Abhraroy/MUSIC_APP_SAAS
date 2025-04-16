import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  EffectCreative,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "swiper/css/bundle";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MovingBorder } from "@/components/ui/moving-border";
import { Button } from "@/components/ui/moving-border";

function SwiperCaraousel() {
  let arr = [1, 2, 3,4];
  arr = arr.concat(arr);

  return (
    <>
      <div className=" w-full h-[400px] flex items-center justify-center overflow-x-hidden">
        <Swiper
          // install Swiper modules
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
          ]}
          speed={400}
          slidesPerView={1}
          effect="creative"
          initialSlide={2}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          creativeEffect={{
            perspective: true,
            prev: {
              translate: [-115, 0,-500],
            },
            next: {
              translate: [115, 0,-500],
            },
            limitProgress: 2,
          }}
          navigation={false}
          loop={true}
          loopAdditionalSlides={2}
        //   autoplay={{
        //     delay: 2000,
        //     disableOnInteraction: false,
        //   }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="text-black flex items-center justify-center h-full w-full overflow-hidden"
        >
          {arr.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full">
                <div className="bg-yellow-400 w-[70%] h-[100%] rounded-[10px]">{item}</div>
              </div>
              
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </>
  );
}

export default SwiperCaraousel;
