import { Avatar, AvatarImage } from "@radix-ui/react-avatar"


function AlbumCard() {
  return (
    <>
    <div className="flex flex-col gap-2">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" className="w-full h-full rounded-3xl object-contain bg-amber-100"></AvatarImage>
        </Avatar>
        <span className="text-white">SONG NAME</span>
    </div>
    </>
  )
}

export default AlbumCard