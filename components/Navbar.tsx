import MiniCart from "@/components/MiniCart";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
      <div className="navbar-start">
        <Link href={"/"}>
          <span className="btn btn-ghost text-xl">🐮 amooozon</span>
        </Link>
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <MiniCart />
      </div>
    </div>
  );
}
