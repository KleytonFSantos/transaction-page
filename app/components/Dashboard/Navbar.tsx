import { Navbar } from "flowbite-react";

export default function TransactionNavbar() {
  return (
    <Navbar fluid rounded>
    <Navbar.Brand href="https://flowbite-react.com">
      
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link active href="#">
        <p>Home</p>
      </Navbar.Link>
      <Navbar.Link href="#">
        <p>About</p>
      </Navbar.Link>
      <Navbar.Link href="#">Services</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Contact</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  );
}
