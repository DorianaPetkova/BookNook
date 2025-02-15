import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import ThemeToggler from "./ThemeToggler";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
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