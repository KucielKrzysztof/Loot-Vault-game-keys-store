function PageSection({ children, className = "" }) {
	return <section className={`w-full max-w-400 mx-auto px-6 md:px-12${className}`}>{children}</section>;
}

export default PageSection;
