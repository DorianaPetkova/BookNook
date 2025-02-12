import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const genreArray=[
  {id:101, name: "Action"}, 
  {id:102, name: "Animation"}
];
const GenreDropDown = () => {
  return <DropdownMenu>
    <DropdownMenuTrigger>
      Genre <ChevronDown/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {genreArray.map((item)=>(
        <DropdownMenuItem key={item?.id}>
          <Link href={`/genre/${item?.id}?genre=${item.name}`}>
            {item?.name}
          </Link>
        </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
}

export default GenreDropDown