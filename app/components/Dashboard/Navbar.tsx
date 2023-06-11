import { useLogoutUser } from "@/app/Services/useLogoutService";
import { Navbar } from "flowbite-react";

export default function TransactionNavbar() {
  const logout = useLogoutUser();

  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <Navbar fluid rounded className="bg-slate-200">
      <Navbar.Brand href="https://flowbite-react.com"></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link onClick={handleLogout}>
          <nav className="bg-slate-300 p-2 rounded font-bold cursor-pointer hover:bg-slate-200 transition-all">
            Logout
          </nav>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
