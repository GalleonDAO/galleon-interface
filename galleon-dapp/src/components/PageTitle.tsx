interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <div className="md:flex md:pl-0 pl-4 mb-4 md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-3xl font-bold leading-7 font-morion text-theme-champagne sm:text-4xl sm:truncate">
          {props.title}
        </h2>
        <p className="text-xl text-theme-champagne">{props.subtitle}</p>
      </div>
    </div>
  );
};

export default PageTitle;
