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
    {id:102, name: "Animation"},
    {id:103, name: "Comedy"},
    {id:104, name: "Drama"},
    {id:105, name: "Fantasy"},
    {id:106, name: "Horror"},
    {id:107, name: "Mystery"},
    {id:108, name: "Romance"},
    {id:109, name: "Sci-Fi"},
    {id:110, name: "Thriller"}
  ];
  const GenreDropDown = () => {
    return <DropdownMenu>
      <DropdownMenuTrigger>
        Genre 
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