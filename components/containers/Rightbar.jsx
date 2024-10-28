// import { Circle } from "lucide-react";
// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import MarkdownIt from "markdown-it";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/router";
// import { sanitizeUrl } from "@/lib/myFun";

// const md = new MarkdownIt();

// export default function Rightbar({
//   category,
//   imagePath,
//   widgets = [],
//   about_me = {},
//   tag_list = [],
//   blog_list = [],
//   categories = [],
// }) {
//   const content = md.render(about_me.value || "");
//   const router = useRouter();
//   const currentPath = router.asPath;
//   const isActive = (path) => currentPath === path;
//   const lastFiveBlogs = blog_list.slice(-5);

//   const renderAbout = () => (
//     <Link
//       title="About"
//       href="/about"
//       className="bg-white rounded-lg overflow-hidden shadow-lg"
//     >
//       <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
//         About
//       </div>
//       <div className="p-4 flex flex-col">
//         <div className="relative overflow-hidden rounded w-full h-[150px]">
//           <Image
//             src={`${imagePath}/${about_me.file_name}`}
//             title="About Thumbnail"
//             alt="Thumbnail Not Found"
//             priority
//             width={241}
//             height={150}
//             loading="eager"
//             className="-z-10 object-cover min-w-full min-h-full"
//           />
//         </div>
//         <div
//           className="mt-3"
//           dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
//         />
//         <p className="mt-3 underline font-bold">More about Us?</p>
//       </div>
//     </Link>
//   );

//   const renderCategories = () => (
//     <div className="bg-theme  rounded-lg overflow-hidden shadow-lg">
//       <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 mb-3 font-semibold capitalize">
//         Categories
//       </div>
//       <div className="flex flex-col w-full text-left px-3 pb-5">
//         {categories?.map((item, index) => (
//           <Link
//             key={index}
//             title={item?.title}
//             href={`/${encodeURI(sanitizeUrl(item.title))}`}
//             className={cn(
//               "text-white capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-purple-200",
//               (category === item?.title || isActive(`/${item?.title}`)) &&
//                 "bg-purple-50 text-black"
//             )}
//           >
//             <Circle className="w-2 h-2 text-purple-500" />
//             {item?.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );

//   const renderTags = () => (
//     <div className="bg-theme rounded-lg overflow-hidden shadow-lg">
//       <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
//         Tags
//       </div>
//       <div className="p-4">
//         <div className="flex items-center gap-1 mb-4 flex-wrap">
//           {tag_list?.slice(0, 10)?.map((item, index) => (
//             <Link
//               key={index}
//               title={item.tag}
//               href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
//               className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-sm px-2"
//             >
//               {item.tag}
//               {item.article_ids?.length > 1 && (
//                 <span className="bg-black text-white px-1 ml-1 text-sm rounded-full">
//                   {item.article_ids.length}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </div>
//         <Link
//           title="Click to see all tags"
//           href="/tags"
//           className="underline font-bold"
//         >
//           Click To See All Tags
//         </Link>
//       </div>
//     </div>
//   );

//   const renderLatestPosts = () => (
//     <div className="bg-theme rounded-lg overflow-hidden shadow-lg">
//       <div className="text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
//         Latest Posts
//       </div>
//       <div className="p-2">
//         {lastFiveBlogs?.reverse().map((item, index) => (
//           <Link
//             key={index}
//             title={item.article_category}
//             href={`/${encodeURI(
//               sanitizeUrl(item.article_category)
//             )}/${encodeURI(sanitizeUrl(item.title))}`}
//             className="grid grid-cols-widget gap-3 p-2 rounded-md hover:shadow-md border border-transparent hover:border-gray-200 transition-all"
//           >
//             <div className="overflow-hidden relative min-h-20 rounded-md w-full bg-black flex-1">
//               <Image
//                 title={item?.imageTitle || "Article Thumbnail "}
//                 src={
//                   item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
//                 }
//                 fill={true}
//                 loading="lazy"
//                 alt="blog"
//                 className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
//               />
//             </div>
//             <div>
//               <p className="font-bold leading-tight">
//                 {item?.title.slice(0, 50)}
//               </p>
//               <div className="flex items-center gap-2 mt-1 justify-between text-gray-400">
//                 <p className="text-xs">{item?.author}</p>
//                 <p className="text-xs whitespace-nowrap">
//                   {item?.published_at}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="h-fit sticky top-0 flex flex-col gap-14">
//       {widgets.map((item, index) => {
//         if (!item.enable) return null;

//         switch (item.name?.toLowerCase()) {
//           case "about":
//             return (
//               <React.Fragment key={item.name}>{renderAbout()}</React.Fragment>
//             );
//           case "categories":
//             return (
//               categories.length > 0 && (
//                 <React.Fragment key={item.name}>
//                   {renderCategories()}
//                 </React.Fragment>
//               )
//             );
//           // case "article tags":
//           //   return (
//           //     tag_list.length > 0 && (
//           //       <React.Fragment key={item.name}>{renderTags()}</React.Fragment>
//           //     )
//           //   );
//           case "latest posts":
//             return (
//               lastFiveBlogs.length > 0 && (
//                 <React.Fragment key={item.name}>
//                   {renderLatestPosts()}
//                 </React.Fragment>
//               )
//             );
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// }

import { ChevronRight, Circle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function Rightbar({
  category,
  imagePath,
  widgets = [],
  about_me = {},
  tag_list = [],
  blog_list = [],
  categories = [],
}) {
  const content = md.render(about_me.value || "");
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;
  const lastFiveBlogs = blog_list.slice(-5);
  const popularPosts = blog_list.filter((post) => post.isPopular); // Assuming there's an isPopular property

  // State to track which section to display
  const [showPopular, setShowPopular] = useState(false);

  const renderAbout = () => (
    <Link
      title="About"
      href="/about"
      className="bg-theme rounded-lg overflow-hidden "
    >
      <div className="p-4  border rounded-lg border-gray-400 ">
        <div className="relative overflow-hidden rounded w-full h-[150px]">
          <Image
            src={`${imagePath}/${about_me.file_name}`}
            title="About Thumbnail"
            alt="Thumbnail Not Found"
            priority
            width={241}
            height={150}
            loading="eager"
            className="-z-10 object-cover min-w-full min-h-full"
          />
        </div>
        <div
          className="mt-3 text-white text-center"
          dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
        />
      </div>
    </Link>
  );

  const renderCategories = () => (
    <div className="bg-theme rounded-lg overflow-hidden shadow-lg border border-gray-400 p-4">
      <div className="shadow-sm text-center mb-3 font-semibold text-2xl py-6 text-white capitalize">
        Explore Topics
      </div>
      <div className="flex flex-col w-full text-left px-3 pb-5">
        {categories?.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${encodeURI(sanitizeUrl(item.title))}`}
            className={cn(
              "text-white capitalize w-full flex items-center justify-between gap-2 hover:text-button transition-all p-2 border-b-2 border-gray-500",
              (category === item?.title || isActive(`/${item?.title}`)) &&
                "bg-gray-600 text-white"
            )}
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="w-8 h-6 text-button" />
              {item?.title}
            </div>
            <span className="text-lg text-gray-300">{item?.count || 0}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderTags = () => (
    <div className="bg-theme rounded-lg overflow-hidden shadow-lg border border-gray-500 p-6 ">
      <div className="shadow-sm text-center  py-2 px-4 font-semibold text-white  text-2xl capitalize">
        Tag Clouds
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {tag_list?.slice(0, 10)?.map((item, index) => (
            <Link
              key={index}
              title={item.tag}
              href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
              className="bg-thene text-gray-400  border border-gray-600 rounded-full hover:text-button hover:border-button transition-all cursor-pointer py-2 text-sm px-2"
            >
              {item.tag}
              {item.article_ids?.length > 1 && (
                <span className="bg-black text-white px-1 ml-1 text-sm rounded-full">
                  {item.article_ids.length}
                </span>
              )}
            </Link>
          ))}
        </div>
        <Link
          title="Click to see all tags"
          href="/tags"
          className="underline font-bold text-gray-500 hover:text-button"
        >
          Click To See All Tags
        </Link>
      </div>
    </div>
  );
  const renderLatestPosts = () => (
    <div className="bg-theme rounded-lg overflow-hidden shadow-lg border border-gray-400 p-6">
      <div className="flex justify-center gap-8 mb-4">
        <button
          onClick={() => setShowPopular(false)}
          className={`py-2 rounded-full px-12 ${
            !showPopular
              ? "bg-button text-white"
              : "bg-theme text-white border border-gray-600"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setShowPopular(true)}
          className={`py-2 px-12 rounded-full ${
            showPopular
              ? "bg-button text-white"
              : "bg-theme text-white border border-gray-600"
          }`}
        >
          Popular
        </button>
      </div>

      <div className="p-2">
        {lastFiveBlogs
          ?.reverse()
          .slice(0, 4)
          .map((item, index) => (
            <Link
              key={index}
              title={item.article_category}
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              className="grid grid-cols-widget gap-3 p-2 rounded-md hover:shadow-md border border-transparent transition-all"
            >
              <div className="overflow-hidden relative min-h-20  w-20 bg-black flex-1 rounded-full">
                <Image
                  title={item?.imageTitle || "Article Thumbnail"}
                  src={
                    item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  fill={true}
                  loading="lazy"
                  alt="blog"
                  className="w-full h-full object-cover rounded-full hover:scale-125 transition-all"
                />
              </div>
              <div>
                <p className="font-bold leading-tight text-white hover:text-button">
                  {item?.title.slice(0, 50)}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-between text-gray-400">
                  <p className="text-xs text-white">{item?.author}</p>
                  <p className="text-xs whitespace-nowrap">
                    {item?.published_at}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );

  const renderPopularPosts = () => (
    <div className="bg-theme rounded-lg overflow-hidden shadow-lg border border-gray-400 p-6">
      <div className="flex justify-center space-x-9 mb-4">
        <button
          onClick={() => setShowPopular(false)}
          className={`py-2 px-12 rounded-full ${
            !showPopular
              ? "bg-button text-white"
              : "bg-theme text-white border border-gray-600"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setShowPopular(true)}
          className={`py-2 px-12 rounded-full ${
            showPopular
              ? "bg-button text-white"
              : "bg-theme text-white border border-gray-600"
          }`}
        >
          Popular
        </button>
      </div>

      <div className="p-2">
        {popularPosts.length > 0 ? (
          popularPosts.slice(0, 4).map((item, index) => (
            <Link
              key={index}
              title={item.article_category}
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              className="grid grid-cols-widget gap-3 p-2 rounded-md hover:shadow-md border border-transparent transition-all"
            >
              <div className="overflow-hidden relative min-h-20 w-20 bg-black flex-1 rounded-full">
                <Image
                  title={item?.imageTitle || "Article Thumbnail"}
                  src={
                    item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  fill={true}
                  loading="lazy"
                  alt="blog"
                  className="w-full h-full object-cover rounded-full hover:scale-125 transition-all"
                />
              </div>
              <div>
                <p className="font-bold text-white leading-tight hover:text-button">
                  {item?.title.slice(0, 50)}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-between text-white">
                  <p className="text-xs">{item?.author}</p>
                  <p className="text-xs whitespace-nowrap">
                    {item?.published_at}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No popular posts available.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-0 flex flex-col gap-14">
      {widgets.map((item, index) => {
        if (!item.enable) return null;

        switch (item.name?.toLowerCase()) {
          case "about":
            return (
              <React.Fragment key={item.name}>{renderAbout()}</React.Fragment>
            );
          case "categories":
            return (
              categories.length > 0 && (
                <React.Fragment key={item.name}>
                  {renderCategories()}
                </React.Fragment>
              )
            );
          case "article tags":
            return (
              tag_list.length > 0 && (
                <React.Fragment key={item.name}>{renderTags()}</React.Fragment>
              )
            );
          case "latest posts":
           
          case "most popular posts":
            return (
              <React.Fragment key={item.name}>
                {showPopular ? renderPopularPosts() : renderLatestPosts()}
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
