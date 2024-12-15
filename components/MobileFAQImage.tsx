const MobileFAQImage = () => {
  return (
    <div className="md:hidden h-[20rem] w-[24rem] flex flex-col items-end mx-auto px-2 mt-12">
      <img
        src="/faq-thumb.webp"
        alt="community sharing"
        width={1000}
        height={1000}
        className="w-full h-full object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-neutral-800"
      />
    </div>
  );
};

export default MobileFAQImage;
