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
    {id:101, name: "Екшън"}, 
    {id:102, name: "Анимация"},
    {id:103, name: "Комедия"},
    {id:104, name: "Драма"},
    {id:105, name: "Фантастика"},
    {id:106, name: "Ужаси"},
    {id:107, name: "Мистерия"},
    {id:108, name: "Романтика"},
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