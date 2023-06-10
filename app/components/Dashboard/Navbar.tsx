import { useLogoutUser } from "@/app/Services/useLogoutService";
import { Navbar } from "flowbite-react";

export default function TransactionNavbar() {
  const logout = useLogoutUser()

  const handleLogout = () => {
   logout.mutate();
  };
  return (
    <Navbar fluid rounded>
    <Navbar.Brand href="https://flowbite-react.com">
      
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link onClick={handleLogout}>
        <p>Logout</p>
      </Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  );
}
