import { Sign } from "crypto";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
    return (
        <div>
           {/*logo and other stuff */} 
          <SearchInput/>
           <GenreDropDown/>
           <ThemeToggler/>
        </div>
      
    );
};

export default Header;