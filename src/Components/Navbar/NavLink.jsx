import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NavLink = ({ data }) => (
  <Box
    as={Link}
    py={1}
    fontSize="xl"
    position="relative"
    to={data.linkUrl}
    _hover={{
      textDecoration: "none",
      textColor: "#ff9b2f",
    }}
  >
    {data.linkText}
  </Box>
);

export default NavLink;
