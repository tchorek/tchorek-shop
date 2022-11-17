import Link from 'next/link';

interface Pagination {
  activePage: number;
  setPage?: any;
  length: number;
}

export const Pagination = ({ activePage, setPage, length }: Pagination) => {
  const activeNumberClass =
    'border-teal-300 text-teal-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium';
  const inactiveNumberClass =
    'border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium';

  const pages = Array.from({ length }, (_, i) => i + 1);

  const start =
    activePage < 4 || pages.length - 3 < activePage
      ? pages.slice(0, 4)
      : pages.slice(0, 2);
  const end =
    activePage < 4 || pages.length - 3 < activePage
      ? pages.slice(pages.length - 4, pages.length)
      : pages.slice(pages.length - 2, pages.length);
  const middlePaginationValues = (activePage: number) => {
    if (activePage < 4 || pages.length - 3 < activePage) {
      return null;
    } else if (activePage === 4) {
      return pages.slice(activePage - 1, activePage + 2);
    } else if (pages.length - 3 === activePage) {
      return pages.slice(activePage - 3, activePage);
    } else {
      return pages.slice(activePage - 2, activePage + 1);
    }
  };
  const middle = middlePaginationValues(activePage);

  const pageLink = (page: number) => {
    return setPage ? (
      <button
        key={page}
        className={
          page === activePage ? activeNumberClass : inactiveNumberClass
        }
        onClick={() => setPage && setPage(page)}
      >
        {page}
      </button>
    ) : (
      <Link href={`/products/page/${page.toString()}`} key={page}>
        <a
          className={
            page === activePage ? activeNumberClass : inactiveNumberClass
          }
        >
          {page}
        </a>
      </Link>
    );
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-6">
      <div className="hidden md:-mt-px md:flex md:flex-wrap">
        {start?.map((page) => pageLink(page))}
        {middle ? (
          <>
            <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              ...
            </span>
            {middle?.map((page) => pageLink(page))}
          </>
        ) : null}
        <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          ...
        </span>
        {end?.map((page) => pageLink(page))}
      </div>
    </nav>
  );
};
