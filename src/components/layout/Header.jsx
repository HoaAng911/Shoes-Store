import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../Style/Header.css";
import Logo from "../../assets/images/logo.png";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DropdownMenu = ({ title, items }) => {
  // Fixed prop name: items
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <h1 className="dropdown-header">{title}</h1>
      {isOpen && (
        <div className="dropdown-content">
          <ul>
            {items.map(
              (
                item,
                index // Corrected: Using `items`
              ) => (
                <li key={index}>
                  <a href={item.link}>{item.label}</a>
                </li>
              )
            )}
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
    // Handle search logic here
  };

  const menItems = [
    { label: "GIÀY THỂ THAO NAM", link: "/men/sneakers" },
    { label: "SANDAL", link: "/men/boots" },
    { label: "DÉP NAM", link: "/men/sandals" },
    { label: "GIÀY TÂY & SLIP ON", link: "/men/sports" },
    { label: "BOOT NAM & OXFORD", link: "/men/formal" },
  ];

  const womenItems = [
    { label: "GIÀY CAO GÓT", link: "/women/heels" },
    { label: "GIÀY THỂ THAO", link: "/women/sneakers" },
    { label: "SANDAL NỮ", link: "/women/sandals" },
    { label: "DÉP SỤC", link: "/women/slides" },
    { label: "BOOT & OXFORD", link: "/women/boots" },
    { label: "GIÀY BÚP BÊ & MỌI", link: "/women/flats" },
  ];

  const bagItems = [
    { label: "Balo laptop, du lịch, thời trang", link: "/bag/balo&bag" },
    { label: "Túi đeo chéo", link: "/bag/crossbodybag" },
  ];
  const accessoriesItems = [
    { label: "Vớ", link: "/accessories/socks" },
    { label: "Chai vệ sinh giày", link: "/accessories/cleaning-kit" },
    { label: "Dây giày", link: "/accessories/shoelaces" },
    { label: "Đế lót", link: "/accessories/insoles" },
  ];

  return (
    <div className="container">
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="Logo" />
        </a>
      </div>

      <DropdownMenu title="GIÀY NAM" items={menItems} />
      <DropdownMenu title="GIÀY NỮ" items={womenItems} />
      <DropdownMenu title="BALO & TÚI" items={bagItems} />
      <DropdownMenu title="PHỤ KIỆN" items={accessoriesItems} />

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

        <a href="/auth">
          <FontAwesomeIcon icon={faUser} /> Login
        </a>

        <a href="/cart">
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </a>
      </nav>
    </div>
  );
};

export default Header;
