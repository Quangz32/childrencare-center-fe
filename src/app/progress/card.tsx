export default function Card({
  weekday,
  image,
  date,
  title,
  content,
}: {
  weekday: string;
  image: string;
  date: string;
  title: string;
  content: string;
}) {
  return (
    <div>
      <div className="p-4 bg-[#FFFCE6] border-[1px] border-black rounded-lg shadow-[1px_2px_0px_0px_#000000] relative">
        <div className="flex flex-col">
          {/* up */}
          <div className="mb-2 flex flex-row justify-between items-center">
            <p className="text-[#7B61FF] text-xl font-bold">{weekday}</p>
            <p className="text-black text-sm font-semibold">{date} </p>
          </div>
          {/* down */}
          <div className=" flex flex-row">
            <img
              src={image}
              alt="image"
              className="w-2/5 border-[#FFDD00] border-2 rounded-lg shadow-[0.83px_1.66px_0px_0px_#000000]"
            />
            <div className="flex flex-col pl-3 w-3/5">
              <p className="text-black text-sm font-bold">{title}</p>
              <p className="text-black text-xl break-words">{content}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-1 absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2">
          <img src={"/images/progress/rect5194.svg"}></img>
          <img src={"/images/progress/rect5194.svg"}></img>
          <img src={"/images/progress/rect5194.svg"}></img>
        </div>
      </div>
    </div>
  );
}
