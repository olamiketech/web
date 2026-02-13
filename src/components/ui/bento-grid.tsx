import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-2xl hover:shadow-primary/20 transition duration-300 shadow-sm shadow-input dark:shadow-none p-4 dark:bg-black/40 dark:border-white/10 bg-white/40 border-black/5 border justify-between flex flex-col space-y-4 backdrop-blur-sm",
                className
            )}
            onClick={onClick}
        >
            {header}
            <div className="group-hover/bento:-translate-y-1 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-2 mt-2 text-lg">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300 leading-relaxed">
                    {description}
                </div>
            </div>
        </div>
    );
};
