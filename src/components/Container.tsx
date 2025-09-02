const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-[100%]">
      <div className="sm:w-[1200px] w-full">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default Container;
