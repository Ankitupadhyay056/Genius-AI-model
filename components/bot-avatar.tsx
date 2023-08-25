import { useUser } from "@clerk/nextjs"
import { Avatar , AvatarImage,AvatarFallback} from "@/components/ui/avatar"


export const  BotAvatar = () =>{

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/logo.png"/>
        </Avatar>
    )
}