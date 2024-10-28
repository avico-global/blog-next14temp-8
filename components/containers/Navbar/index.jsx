import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";
import Container from "@/components/common/Container";

export default function Navbar({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  category,
  searchQuery,
}) {
  const [sidebar, setSidebar] = useState(false);

  const closeSidebar = () => setSidebar(false);

  return (
    <>
      <FullContainer className="sticky top-0 z-20 bg-theme text-white shadow py-2 lg:py-3">
        <Container>
          <div className="flex justify-between items-center w-full lg:grid lg:grid-cols-nav">
            {/* Logo and Menu Toggle (for mobile) */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Logo logo={logo} imagePath={imagePath} />
              <div className="flex gap-4 lg:hidden">
                <Search
                  className="w-8 h-8 text-white cursor-pointer bg-button rounded-full p-2"
                  onClick={handleSearchToggle}
                />
                <Menu
                  onClick={() => setSidebar(true)}
                  className="cursor-pointer w-8 h-8 bg-button rounded-full p-2"
                />
              </div>
            </div>

            {/* Category Links (for larger screens) */}
            <div
              className="hidden lg:flex items-center justify-end gap-4 text-white relative"
              ref={searchContainerRef}
            >
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title}
                  href={`/${sanitizeUrl(item?.title)}`}
                  className={cn(
                    "font-semibold text-white capitalize border-transparent transition-all py-4 px-2 border-b-2 w-fit"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Search and Menu Icon (for larger screens) */}
            <div className="hidden lg:flex items-center justify-end gap-2">
              <Search
                className="w-10 h-10 md:w-11 md:h-11 text-white cursor-pointer bg-button rounded-full p-2"
                onClick={handleSearchToggle}
              />
              <Menu
                onClick={() => setSidebar(true)}
                className="cursor-pointer w-10 h-10 md:w-11 md:h-11 bg-button rounded-full p-2"
              />
            </div>
          </div>
        </Container>
      </FullContainer>

      {/* Search Input (on mobile) */}
      {openSearch && (
        <div className="fixed lg:absolute top-16 lg:right-0 w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0 px-4 lg:px-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="lg:text-xl border border-gray-300 inputField rounded-md outline-none bg-white shadow-xl p-2 px-3 mx-auto transition-opacity duration-300 ease-in-out opacity-100 w-5/6 lg:w-[650px] focus:ring-2 focus:ring-yellow-500"
            placeholder="Search..."
            autoFocus
          />
          {searchQuery && (
            <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
              {filteredBlogs?.length > 0 ? (
                filteredBlogs.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item?.title
                    )}`}
                  >
                    <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                      {item.title}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-2 text-gray-600">No articles found.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 right-0 h-screen flex flex-col justify-between bg-theme shadow-lg text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-mr-96"
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-white cursor-pointer"
              onClick={closeSidebar}
            />
          </div>

          <div className="flex lg:hidden items-center gap-3 font-normal mt-8 w-full">
            <Search className="w-7" />
            <input
              className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
              placeholder="Search..."
            />
          </div>

          <div className="flex flex-col pt-10">
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title}
                href={`/${sanitizeUrl(item?.title)}`}
                className={cn(
                  "font-semibold text-white capitalize border-transparent transition-all py-2 px-2 border-b border-gray-600"
                )}
                onClick={closeSidebar}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-normal">© 2024 Katen. All Rights Reserved.</p>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 "
          onClick={closeSidebar}
        ></div>
      )}

      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }

        .sidebar.open {
          width: 300px;
        }

        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
