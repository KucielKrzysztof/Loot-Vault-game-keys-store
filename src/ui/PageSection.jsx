function PageSection({ children, className = "" }) {
  return (
    <section className={`mx-auto w-full max-w-400 px-6 md:px-12 ${className}`}>
      {children}
    </section>
  );
}

export default PageSection;
