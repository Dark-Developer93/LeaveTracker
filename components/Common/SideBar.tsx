import Image from "next/image";

const SideBar = () => {
  return (
    <div className="hidden fixed  inset-y-0 left-0 sm:block w-[5rem] bg-white rounded-lg overflow-hidden dark:bg-black dark:border-r">
      <div className="flex flex-col items-center justify-between h-full">
        {/* TOP PART  */}
        <div>
          <div className="my-8">
            <Image src="/spana-b.png" width={50} height={50} alt="logo" />
          </div>

          <nav className="flex flex-col items-center px-3 overflow-y-auto">
            User
          </nav>
        </div>
        {/* BOTTOM PART  */}
        <div className="flex flex-col items-center space-y-6 my-8">12</div>
      </div>
    </div>
  );
};

export default SideBar;
