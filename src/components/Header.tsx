import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
const Header = () => {
    return (
        <div>
           {/*logo and other stuff */} 
          <SearchInput/>
           <GenreDropDown/>
        </div>
        
    );
};

export default Header;