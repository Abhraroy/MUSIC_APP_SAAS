import {useRef} from "react"





import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AlbumCard from "../../Utility_Component/AlbumCard";










function CollectionPage() {
  const navButtonArray_type_1 = ["Latest", "Albums", "Songs", "Events"];
  const navButtonArray_type_2 = ["Home","About Artist","Events","Collection"]
  const FeatureSong = []
  const Albums = []


  const searchInput = useRef<HTMLInputElement | null>(null)
  const searchButton = useRef<HTMLButtonElement | null>(null)



  const handleSearch = (e)=>{
    e.currentTarget.style.display="none";
    searchInput.current && (searchInput.current.style.display = "block");
  }
  const handleKeypress = (e)=>{
    if (e.key==="Escape"){
      console.log("e"); 
      searchInput.current && (searchInput.current.style.display="none")
      searchButton.current && (searchButton.current.style.display = "flex")
    }
  }

  return (
    <>
      <div className="md:hidden w-[100dvw] bg-black p-4 box-border gap-[1rem] flex flex-col">
        <div className="w-[100%] flex items-center justify-between h-[100px] gap-4">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className=" object-contain w-[70px] h-[70px] rounded-[100px]"
            />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <Input ref={searchInput} className="hidden w-[300px] outline-0 text-white" placeholder="Enter any song name" onKeyDown={handleKeypress}/>
          <button ref={searchButton} onClick={handleSearch} className=" h-[70px] w-[50px] rounded-4xl text-2xl flex items-center justify-center text-white bg-transparent border-1 border-white">
            <FaSearch />
          </button>
        </div>

        <div className="flex w-[100%]  flex-col gap-[1rem]">
          <span className="text-white">Lets Explore</span>
          <Carousel className=" w-[100%] h-fit p-1 box-border">
            <CarouselContent>
              {navButtonArray_type_1.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center basis-1/3 pl-2 h-fit"
                >
                  <button className="bg-white rounded-3xl pl-7 pr-7 pb-4 pt-4 box-border">
                    {item}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex w-[100%] flex-row justify-between">
          <span className="text-white">Lets Explore</span>
          <span className="text-white">Lets Explore</span>
        </div>

        <Carousel className="h-fit box-border">
          <CarouselContent>
            <CarouselItem className="basis-1/2">
            <AlbumCard />
            </CarouselItem>
            <CarouselItem className="basis-1/2">
              <AlbumCard />
            </CarouselItem>
            <CarouselItem className="basis-1/2">
              <AlbumCard />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="text-white">Features</div>

        <div className="bg-yellow-400 w-[100%] flex items-center justify-start">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-[130px] h-[130px] rounded-3xl object-contain bg-amber-100"
            ></AvatarImage>
          </Avatar>
          <div></div>
        </div>

        <div className=" h-fit bg-amber-300 rounded-3xl gap-[1.5rem] fixed bottom-[1.5rem] left-[1rem] right-[1rem] flex items-center justify-around box-border pl-[2rem] pr-[2rem] p-[1.5rem]">
              {
                navButtonArray_type_2.map((item,index)=>(
                  <p className="" key={index}>{item}</p>
                ))
              }
        </div>
      </div>
    </>
  );
}

export default CollectionPage;
