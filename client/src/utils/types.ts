export type LINK = {
    route: string | null;
    name: string;
    icon: string;
    subLinks: {
        name: string;
        route: string;
    }[] | null;
}
