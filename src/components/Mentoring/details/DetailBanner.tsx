interface DetailBannerProps {
  role: string;
  title: string;
  introduce: string;
}

export default function DetailBanner({ role, title, introduce }: DetailBannerProps) {
  return (
    <section className="flex h-[260px] w-full items-center bg-[#f2f2f2] sm:h-[330px]">
      <div className="m-auto w-full max-w-5xl px-6 sm:px-10">
        <div className="w-full text-[#707070] sm:w-[max(60%,500px)]">
          <section className="flex items-center space-x-2">
            <div className="rounded-lg bg-[rgba(141,141,141,0.1)] py-0.5 px-2 text-[#8d8d8d]"># {role}</div>
          </section>
          <h2 className="py-3 text-2xl font-bold sm:text-3xl">{title}</h2>
          <p>{introduce}</p>
        </div>
      </div>
    </section>
  );
}
