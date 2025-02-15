import { useLocation, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../styles/constants";

export default function PageRedirect() {
  const location = useLocation(); // Get current location
  const history = useHistory(); // Get history object for navigation

  const isHomePage = location.pathname === "/"; // Check if we're on the home page
  const handleBackNavigation = () => {
    history.push("/"); // Redirect to home page
  };
  return (
    <div>
      {!isHomePage && ( // Conditionally render back arrow
        <ArrowBackIcon
          onClick={handleBackNavigation}
          style={{ cursor: "pointer", color: colors.text }}
        />
      )}
    </div>
  );
}
