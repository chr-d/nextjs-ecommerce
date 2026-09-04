import MiniCart from "@/components/MiniCart";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div className="navbar bg-base-200 sticky top-0 z-10 shadow-sm">
        <div className="navbar-start">
          <div className="indicator">
            <Link href={"/"}>
              <span className="btn btn-base-300 text-xl">🐮 amooozon</span>
            </Link>
            <span className="badge badge-primary badge-sm indicator-item top-2 rotate-25">
              v3.0
            </span>
          </div>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li className="bg-base-300">
              <Link href={"/"}>Home</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <MiniCart />
        </div>
      </div>
    </header>
  );
}
