function AppButton({ subtitle, title, icon }) {
  return (
    <button className="flex h-[52px] w-[165px] shrink-0 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black px-3 py-2 text-white transition-all hover:bg-zinc-900">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center">
        {icon}
      </div>

      <div className="flex flex-col items-start justify-center leading-none">
        <span className="mb-0.5 text-[9px] font-medium whitespace-nowrap text-gray-400 uppercase">
          {subtitle}
        </span>
        <span className="text-[14px] font-bold whitespace-nowrap">{title}</span>
      </div>
    </button>
  );
}

export default AppButton;
