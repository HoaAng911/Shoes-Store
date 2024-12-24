import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../Style/Header.css";
import Logo from "../../assets/images/logo.png";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        to={
          title === "GIÀY NAM"
            ? "/men"
            : title === "GIÀY NỮ"
            ? "/women"
            : title === "BALO & TÚI"
            ? "/bags"
            : "/"
        }
        className="dropdown-header"
      >
        {title}
      </NavLink>
      {isOpen && (
        <div className="dropdown-content">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <NavLink to={item.link}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const menItems = [
    { label: "GIÀY THỂ THAO NAM", link: "/men" },
    { label: "SANDAL", link: "/men" },
    { label: "DÉP NAM", link: "/men" },
    { label: "GIÀY TÂY & SLIP ON", link: "/men" },
    { label: "BOOT NAM & OXFORD", link: "/men" },
  ];

  const womenItems = [
    { label: "GIÀY CAO GÓT", link: "/women" },
    { label: "GIÀY THỂ THAO", link: "/women" },
    { label: "SANDAL NỮ", link: "/women" },
    { label: "DÉP SỤC", link: "/women" },
    { label: "BOOT & OXFORD", link: "/women" },
    { label: "GIÀY BÚP BÊ & MỌI", link: "/women" },
  ];

  const bagItems = [
    { label: "Balo laptop, du lịch, thời trang", link: "/bags" },
    { label: "Túi đeo chéo", link: "/bags" },
  ];

  return (
    <div className="container">
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <DropdownMenu title="GIÀY NAM" items={menItems} />
      <DropdownMenu title="GIÀY NỮ" items={womenItems} />
      <DropdownMenu title="BALO & TÚI" items={bagItems} />

      <nav>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <NavLink to="/auth">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>

        <NavLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
