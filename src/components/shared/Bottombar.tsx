import { bottombarLinks } from "@/constant";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((bottomLink, index) => {
        const isActive = pathname === bottomLink.route;
        return (
          <Link
            to={bottomLink.route}
            key={index}
            className={`flex-center flex-col gap-1 p-2 transition ${
              isActive && "bg-primary-500 rounded-[10px]"
            }`}
          >
            <img
              src={bottomLink.imgURL}
              alt={bottomLink.label}
              className={`${isActive && "invert-white"}`}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2">{bottomLink.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
