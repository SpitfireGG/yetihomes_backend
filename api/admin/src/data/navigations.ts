import { Building2, Contact, FileSpreadsheet, Home, Inbox, LayoutGrid, MapPinned, Mountain, Newspaper, Phone, Search, Settings, Sparkles, Building, Key, Users, Globe } from "lucide-react";

export const navigations = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        subNavigations: []
    },
    {
        title: "Properties",
        url: "/properties",
        icon: Building,
        subNavigations: [
            { title: 'All Properties', link: '/properties' },
            { title: 'Add New', link: '/properties/create' },
            { title: 'Featured', link: '/properties/featured' },
        ]
    },
    {
        title: "Property Types",
        url: "/property-types",
        icon: LayoutGrid,
        subNavigations: [
            { title: 'Houses', link: '/property-types/houses' },
            { title: 'Apartments', link: '/property-types/apartments' },
            { title: 'Lands', link: '/property-types/lands' },
        ]
    },
    {
        title: "Enquiries",
        url: "/enquiries",
        icon: Inbox,
        subNavigations: [
            { title: 'All Enquiries', link: '/enquiries' },
            { title: 'Property Requests', link: '/enquiries/property' },
            { title: 'Viewing Requests', link: '/enquiries/viewing' },
            { title: 'General', link: '/enquiries/general' },
        ]
    },
    {
        title: "Amenities",
        url: "/amenities",
        icon: Sparkles,
        subNavigations: [
            { title: 'All Amenities', link: '/amenities' },
            { title: 'Add New', link: '/amenities/create' },
        ]
    },
    {
        title: "Company",
        url: "/company",
        icon: Building2,
        subNavigations: [
            { title: 'Teams', link: '/company/teams' },
            { title: 'About Us', link: '/company/about-us' },
        ]
    },
    {
        title: "Content Pages",
        url: "/terms",
        icon: FileSpreadsheet,
        subNavigations: [
            { title: 'Terms & Conditions', link: '/terms' },
            { title: 'Privacy Policy', link: '/privacy' },
            { title: 'Cookies Policy', link: '/cookies' },
        ]
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
        subNavigations: [
            { title: 'All Users', link: '/users' },
        ]
    },
    {
        title: "Blog",
        url: "/blogs",
        icon: Newspaper,
        subNavigations: [
            { title: 'All Articles', link: '/blogs' },
            { title: 'Add New', link: '/blogs/create' },
        ]
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
        subNavigations: [
            { title: 'Contact Info', link: '/contact-info' },
            { title: 'Social Media', link: '/social-media' },
        ]
    },
    {
        title: "SEO",
        url: "/seo",
        icon: Globe,
        subNavigations: [
            { title: 'SEO Dashboard', link: '/seo' },
            { title: 'Location Pages', link: '/seo/locations' },
            { title: 'Property Types', link: '/seo/property-types' },
            { title: 'Agents', link: '/seo/agents' },
            { title: 'Redirects', link: '/seo/redirects' },
        ]
    },
]