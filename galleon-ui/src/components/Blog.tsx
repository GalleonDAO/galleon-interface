import { posts } from "constants/blogs";

export default function Blog() {
  return (
    <div className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className=" text-3xl font-bold font-morion text-theme-navy  sm:text-5xl">
            Project Updates
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-theme-navy sm:mt-4">
            Stay up to date with the latest announcements from Galleon.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-theme-sky">
                    <a
                      target="_blank"
                      href={post.category.href}
                      className="hover:underline" rel="noreferrer"
                    >
                      {post.category.name}
                    </a>
                  </p>
                  <a target="_blank" href={post.href} className="block mt-2" rel="noreferrer">
                    <p className="text-xl  font-morion font-semibold text-theme-navy">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-theme-navy">
                      {post.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a target="_blank" href={post.author.href} rel="noreferrer">
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-theme-navy">
                      <a
                        target="_blank"
                        href={post.author.href}
                        className="hover:underline" rel="noreferrer"
                      >
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-theme-sky">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
