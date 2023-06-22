const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="lg:px-10 px-5 max-w-[1240px] mx-auto mt-10">
      {children}
    </section>
  );
};

export default Wrapper;
