import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";

export default function Navbar({
  logo,
  categories,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  openSearch,
  blog_list,
}) {
  const [sidebar, setSidebar] = useState(false);
  const searchInputRef = useRef(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const closeSidebar = () => setSidebar(false);
  
  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the input and the results container
      if (searchInputRef.current && 
          !searchInputRef.current.contains(event.target) && 
          !event.target.closest('.search-results-container')) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close search on page update
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [router.asPath]);

  // Debounce search query
  const debounceSearch = useCallback(() => {
    if (searchQuery) {
      const filtered = blog_list.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  }, [searchQuery, blog_list]);

  useEffect(() => {
    const timeoutId = setTimeout(debounceSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, debounceSearch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
  };

  const handleResultClick = (e) => {
    e.stopPropagation();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <FullContainer className="sticky top-0 z-20 bg-theme text-white shadow py-2 lg:py-3 border-b border-gray-700">
        <FullContainer className="lg:border-b lg:border-gray-700">
          <Container>
            <div className="flex justify-between items-center w-full lg:grid lg:grid-cols-nav py-3 lg:pb-6">
              <div className="space-x-6   hidden lg:flex ">
                <Link
                  title="About"
                  href="/about"
                  className="text-sm text-white hover:text-primary1 "
                >
                  About Us
                </Link>
                <Link
                  title="Contact Us"
                  href="/contact"
                  className="text-sm text-white hover:text-primary1"
                >
                  Contact Us
                </Link>
              </div>

              {/* Logo and Menu Toggle (for mobile) */}
              <div className="flex items-center justify-between lg:justify-center w-full lg:w-auto">
                <Logo logo={logo} imagePath={imagePath} />
                <div className="flex gap-4 lg:hidden">
                  <Menu
                    onClick={() => setSidebar(true)}
                    className="cursor-pointer w-8 h-8 bg-mustRead rounded-full p-2"
                  />
                </div>
              </div>

              {/* Search Icon (for larger screens) */}
              <div className="hidden lg:flex items-center justify-end gap-2">
                {/* Search Section */}
                <div className="flex items-center justify-end gap-3 relative">
                  <div className="hidden lg:flex items-center border border-white/30 rounded-md px-4 gap-1">
                    <Search className="w-5 h-5" aria-hidden="true" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onClick={handleSearchClick}
                      className="p-2 transition-opacity duration-300 ease-in-out flex-1 outline-none bg-transparent"
                      placeholder="Search..."
                      ref={searchInputRef}
                    />
                  </div>

                  {isSearchOpen && searchQuery && (
                    <div className="absolute top-full p-3 right-0 bg-footer text-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px] search-results-container">
                      {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((item, index) => (
                          <Link
                            key={index}
                            href={`/${sanitizeUrl(
                              item.article_category
                            )}/${sanitizeUrl(item?.title)}`}
                            title={item.title}
                            onClick={handleResultClick}
                          >
                            <div className="p-2 hover:bg-theme border-b border-gray-400 text-gray-200">
                              {item.title}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-2 text-gray-500">
                          No results found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </FullContainer>

        <Container>
          <div className="flex justify-center items-center w-full">
            {/* Category Links (for larger screens) */}
            <div
              className="hidden lg:flex justify-center gap-4 text-white py-1  lg:border-b-2 lg:border-transparent w-full"
              ref={searchContainerRef}
            >
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title}
                  href={`/${sanitizeUrl(item?.title)}`}
                  className={cn(
                    "font-semibold text-white capitalize transition-all pt-3 px-2 lg:border-b-2 lg:border-transparent  hover:text-primary1"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </FullContainer>

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

          <div className="relative w-full mt-8">
            <div className="flex lg:hidden items-center gap-3 font-normal w-full">
              <Search className="w-7" />
              <input
                className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                ref={searchInputRef}
              />
            </div>
            {searchQuery && (
              <div className="absolute left-0 top-full mt-2 bg-footer text-white shadow-2xl rounded-md z-10 w-full max-h-60 overflow-y-auto">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item, index) => (
                    <Link
                      key={index}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                      title={item.title}
                    >
                      <div className="p-2 hover:bg-theme border-b border-gray-400 text-gray-200">
                        {item.title}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No results found</div>
                )}
              </div>
            )}
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
          <div className="flex flex-col  ">
            <Link
              title="About"
              href="/about"
              className=" font-semibold capitalize  text-white py-2 px-2 border-b border-gray-600"
            >
              About Us
            </Link>
            <Link
              title="Contact Us"
              href="/contact"
              className="font-semibold capitalize text-white py-2 px-2 border-b border-gray-600"
            >
              Contact Us
            </Link>
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
