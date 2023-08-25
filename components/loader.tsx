import Image from "next/image"

export const Loader = () =>{
    return (
        <div className="h-full flex flex-col gap-y-4 item-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                   <Image
                    alt="logo"
                    fill
                    src="/logo.png"
                   />
            </div>
            <p className="text-sm text-mute">
                 Genius is thinking
            </p>
        </div>
    )
}