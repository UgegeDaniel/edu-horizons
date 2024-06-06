export type LINK = {
    route: string | null;
    name: string;
    icon: string;
    subLinks: {
        name: string;
        route: string;
    }[] | null;
}


export type AssignedLevels =
    | 'PRE-SECONDARY'
    | 'JUNIOR_SECONDARY'
    | 'SECONDARY'
    | 'SENIOR_SECONDARY'
    | 'MISSCELENEOUS'
    | 'UNASSIGNED';

export type Days =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

export interface Profile {
    picture: string;
    phoneNumber: string;
    address: {
        houseNumber: string;
        street: string;
        city: string;
        country: string;
    };
    edu_bg: {
        curr_institution: string;
        curr_program: string;
        upcoming_cert: string;
        year: string;
    };
    assigned_level: AssignedLevels;
    interests: string[];
    bio: string;
    preferred_meeting_days: Days[];
}


export type UserRole =
    'ADMIN' |
    'TUTOR' |
    'STUDENT' |
    'UNASSIGNED'


export interface User {
    jwt_token: string
    id: number,
    email: string,
    verified_email: boolean,
    strategy: "google" | "local",
    given_name: string,
    family_name: string,
    role: UserRole,
    profile: Profile
}