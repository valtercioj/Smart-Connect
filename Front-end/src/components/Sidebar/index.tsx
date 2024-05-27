import { Link, useLocation } from "react-router-dom";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
import { useParams } from "react-router-dom";
import { CiFilter } from "react-icons/ci";

export default function Sidebar() {
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="flex w-full justify-between bg-bg text-gray-100 md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="flex w-full">
          <Link
            to="/"
            className="text-white block truncate whitespace-nowrap border-l-2 border-yellow-100 p-4 font-Montserrat text-xl font-bold text-black"
          >
            SmartConnect
          </Link>
        </div>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 rounded-md p-2 text-black hover:cursor-pointer focus:outline-none bg-bg"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className="absolute inset-y-0 left-0 z-50 max-w-3/4 transform space-y-6 overflow-y-auto bg-bg px-0 pt-6  transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex w-full flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            to="/"
            className="text-white flex items-center space-x-2 px-4"
            title="Your App is cool"
          >
            {/* <img src="{% static 'assets/mascote.svg'%}" alt="" /> */}
            <span className="truncate whitespace-nowrap border-l-2 border-yellow-100 px-[6.25px] font-Montserrat text-xl font-bold">
              SmartConnect
            </span>
          </Link>

          <nav
            data-dev-hint="main navigation"
            className="flex flex-col items-center "
          >
            <Link
              to="/"
              className={`hover:text-white group mb-6 ml-6 mt-36 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${
                location.pathname === "/" && "bg-yellow-200"
              }`}
            >
              <svg
                className="mr-2"
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_170_194)">
                  <path
                    d="M18.9171 7.30103L10.2457 0.264954C10.035 0.0927576 9.77185 -0.00122833 9.50042 -0.00122833C9.229 -0.00122833 8.96583 0.0927576 8.7551 0.264954L0.0837115 7.30103C0.060804 7.31944 0.0417585 7.34225 0.0276807 7.36813C0.0136029 7.39401 0.00477327 7.42245 0.00170444 7.4518C-0.00136439 7.48115 0.00138873 7.51081 0.00980395 7.53908C0.0182192 7.56734 0.0321288 7.59365 0.0507254 7.61646L0.519128 8.19751C0.537742 8.22064 0.560703 8.23985 0.586698 8.25403C0.612693 8.26822 0.641212 8.27711 0.670623 8.2802C0.700034 8.28328 0.729761 8.2805 0.758103 8.27201C0.786444 8.26352 0.812845 8.24948 0.835795 8.23071L2.11137 7.19511V16.4681C2.11137 16.609 2.16697 16.7441 2.26595 16.8437C2.36493 16.9434 2.49917 16.9993 2.63915 16.9993H16.3614C16.5013 16.9993 16.6356 16.9434 16.7346 16.8437C16.8335 16.7441 16.8891 16.609 16.8891 16.4681V7.19843L18.169 8.23736C18.2154 8.27518 18.2748 8.29292 18.3342 8.2867C18.3935 8.28047 18.448 8.25078 18.4857 8.20415L18.9538 7.6231C18.9894 7.57477 19.0055 7.51459 18.9987 7.45478C18.9919 7.39497 18.9627 7.34 18.9171 7.30103ZM7.91692 15.9368V10.6243H11.0836V15.9368H7.91692ZM15.8336 15.9368H12.1391V10.0931C12.1391 9.95218 12.0835 9.81706 11.9846 9.71743C11.8856 9.6178 11.7513 9.56183 11.6114 9.56183H7.38915C7.24917 9.56183 7.11493 9.6178 7.01595 9.71743C6.91697 9.81706 6.86137 9.95218 6.86137 10.0931V15.9368H3.16692V6.33847L9.35875 1.31152C9.39783 1.27931 9.44678 1.26171 9.49729 1.26171C9.5478 1.26171 9.59675 1.27931 9.63583 1.31152L15.8336 6.34112V15.9368Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_170_194">
                    <rect width="19" height="17" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Dashboard
            </Link>

            <Link
              to="/clientes"
              className={`hover:text-white group gap-x-2 mb-6 ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${location.pathname === "/clientes"  && "bg-yellow-200"} ${location.pathname === `/clienteId/${id}`  && "bg-yellow-200"}`}
            >
             <img src="/user1.svg" alt="cliente" className="w-[19px] h-[17px]" />
              Clientes
            </Link>

            <Link
              to="/filtro"
              className={`hover:text-white group gap-x-2 mb-6 ml-2 flex items-center space-x-2 px-8 py-4 font-Montserrat text-sm font-medium transition duration-200 ${location.pathname === "/filtro"  && "bg-yellow-200"}`}
            >
            <CiFilter size={19}/>

              Filtro
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
