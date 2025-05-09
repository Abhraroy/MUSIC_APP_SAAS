import { WobbleCard } from "@/components/ui/wobble-card.js";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCreative,
  Autoplay,
  Mousewheel,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-cards";
import "swiper/css/bundle";
import useStore from "../../utils/ZustandStore";
function Collection({
  musicList,
}: {
  musicList: Array<{
    _id: string;
    audio_URL: string;
    audio_name: string;
    img_URL: string;
  }>;
}) {
  const { setTrack } = useStore();

  const handleTrack = (url: string) => {
    setTrack(url);
  };

  return (
    <>
      <div className="w-full h-[3rem] text-3xl text-white bg-green-900 shrink-0 "></div>
      <div className="w-full h-[38%] shrink-0 border-box flex flex-row gap-[0.5rem] overflow-y-hidden">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
            Mousewheel,
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
          className="text-black flex items-center justify-center h-full w-full"
        >
          {musicList.map(({ _id, audio_URL, audio_name, img_URL }) => (
            <SwiperSlide key={_id} className="p-[3px] ">
              <WobbleCard
                containerClassName=" shrink-0 w-[300px] h-full  bg-white/50  backdrop-blur-3xl"
                noiseReplace={img_URL}
              >
                <span>{audio_name}</span>
                <img src={img_URL} />
                <span>{audio_URL}</span>
              </WobbleCard>{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" w-full flex flex-row flex-wrap">
      {musicList.map(({ _id, audio_URL, audio_name, img_URL }) => (
           <div
           key={_id}
           className=" basis-1/3 h-[100px] border-box p-[10px] border-r-[2px] border-white bg-amber-300 "
           onClick={() => handleTrack("")}
         >
          <span>{audio_name}</span>
          <span>{img_URL}</span>
          <span>{audio_URL}</span>
         </div>
          ))}

      </div>
      <div className=" w-full h-[50px] shrink-0 "></div>
    </>
  );
}

export default Collection;
