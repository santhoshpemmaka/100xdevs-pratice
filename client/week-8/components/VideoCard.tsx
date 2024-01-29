import Image from "next/image";


const VideoCard = () => {
    return (
        <div className="m-4 w-[18rem]">
            <Image src="/download.jpeg" className="rounded"  width={250} height={20} alt="thumbnail-image" />
            <div className="grid grid-cols-12 w-[350px] mt-2">
                <div className="col-span-2">
                    <Image className="rounded-full mx-2 " src="/download.jpeg" width={50} height={50} alt="thumbnail-image" />
                </div>
                <div className="col-span-10">
                    <p className="ml-2 text-[13px]">Jawan: Chaleya(Hindi) Santhosh</p>
                    <p className="ml-2 text-[10px] text-gray-600">Santhosh Pemmaka</p>
                    <p className="ml-2 text-[10px] text-gray-600">46Mn | 13 days ago</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;