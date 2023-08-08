import Image from "next/image";

const mapRotation = (
  val: number,
  minA: number,
  maxA: number,
  minB: number,
  maxB: number
) => {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
};

const NFTHoverCard: React.FC<{ nftId: string | number }> = ({ nftId }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rotateY = mapRotation(e.nativeEvent.offsetX, 0, 180, -25, 25);
    const rotateX = mapRotation(e.nativeEvent.offsetY, 0, 250, 25, -25);
    const brightness = mapRotation(e.nativeEvent.offsetY, 0, 250, 1.5, 0.5);

    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    e.currentTarget.style.filter = `brightness(${brightness})`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
    e.currentTarget.style.filter = "brightness(1)";
  };

  return (
    <>
      <style jsx>{`
        .perspective {
          perspective: 1200px; /* Tailwind doesn't support perspective */
        }
      `}</style>
      <div className="perspective scale-100 transition-all duration-200 ease-out hover:z-10 hover:scale-125 ">
        <div
          className="perspective transition-all duration-200 ease-out "
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <Image
            unoptimized
            className="w-[200px] h-[200px] rounded-lg transition-all duration-200 ease-out"
            src="/apelleons-placeholder.png"
            width="200"
            height="200"
            alt=""
          />
          <span className="text-md rounded-tl-lg rounded-br-lg bg-slate-600 px-1.5 absolute bottom-0 right-0 pointer-events-none">
            #{nftId}
          </span>
        </div>
      </div>
    </>
  );
};

export default NFTHoverCard;
