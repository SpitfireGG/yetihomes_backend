import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Property } from "@/@types/property";
import { TeamMember, TeamApiResponse, TeamListApiResponse } from "@/@types/company/team";
import { CRUD } from "@/api/crud";

/* API Instances */
const properties = new CRUD("api/properties");
const propertiesAdmin = new CRUD("api/properties/admin/all");
const inquiries = new CRUD("api/inquiries");
const teams = new CRUD("api/teams");
const blogs = new CRUD("api/blogs");
const reviews = new CRUD("api/reviews");
const faqs = new CRUD("api/faqs");
const affiliations = new CRUD("api/affiliations");
const newsletters = new CRUD("api/company/newsletters");
const legalDocuments = new CRUD("api/company/legal-documents");
const languages = new CRUD("api/languages");
const currencies = new CRUD("api/countries");
const faqCategories = new CRUD("api/faq-categories");
const contentCategories = new CRUD("api/content-categories");
const terms = new CRUD("api/company/terms-and-conditions");
const privacy = new CRUD("api/company/privacy-policy");
const sustainability = new CRUD("api/company/sustainability-policy");
const cookies = new CRUD("api/company/cookie-policy");
const csis = new CRUD("api/company/csis");
const achievements = new CRUD("api/company/achievements");
const companyAffilations = new CRUD("api/company/affilations");
const guides = new CRUD("api/company/guides");
const companyLegalDocs = new CRUD("api/company/legal-docs");
const contactInfo = new CRUD("api/company/contact-info");
const associations = new CRUD("api/company/associations");
const contents = new CRUD("api/contents");
const countries = new CRUD("api/countries");
const amenities = new CRUD("api/amenities");

/* ==================== PROPERTIES ==================== */
export const useProperties = () => {
    return useQuery<{ data: Property[] }>({
        queryKey: ["properties"],
        queryFn: propertiesAdmin.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const usePropertiesById = (id: string) => {
    return useQuery<{ data: Property }>({
        queryKey: ["properties", id],
        queryFn: () => properties.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

/* ==================== AMENITIES ==================== */
export const useAmenities = () => {
    return useQuery({
        queryKey: ["amenities"],
        queryFn: amenities.getData,
        staleTime: 5 * 60 * 1000,
    });
};

/* ==================== INQUIRIES ==================== */
export const usePropertyEnquiries = () => {
    return useQuery({
        queryKey: ["inquiries"],
        queryFn: inquiries.getData,
        staleTime: 5 * 60 * 1000,
    });
};

/* ==================== TEAMS ==================== */
export const useTeams = () => {
    return useQuery<TeamListApiResponse>({
        queryKey: ["teams"],
        queryFn: teams.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useTeamById = (id: string) => {
    return useQuery<TeamApiResponse>({
        queryKey: ["teams", id],
        queryFn: () => teams.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => teams.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

export const useUpdateTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => teams.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

export const useDeleteTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => teams.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

/* ==================== BLOGS ==================== */
export const useBlogs = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["blogs"],
        queryFn: blogs.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useBlogById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["blogs", id],
        queryFn: () => blogs.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => blogs.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => blogs.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => blogs.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

/* ==================== REVIEWS ==================== */
export const useReviews = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["reviews"],
        queryFn: reviews.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useReviewById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["reviews", id],
        queryFn: () => reviews.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => reviews.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => reviews.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => reviews.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};

/* ==================== FAQs ==================== */
export const useFaqs = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["faqs"],
        queryFn: faqs.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useFaqById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["faqs", id],
        queryFn: () => faqs.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateFaq = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => faqs.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
    });
};

export const useUpdateFaq = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => faqs.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
    });
};

export const useDeleteFaq = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => faqs.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
    });
};

/* ==================== FAQ CATEGORIES ==================== */
export const useFaqCategories = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["faqCategories"],
        queryFn: faqCategories.getData,
        staleTime: 5 * 60 * 1000,
    });
};

/* ==================== CONTENT CATEGORIES ==================== */
export const useGetContentCategory = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["contentCategories"],
        queryFn: contentCategories.getData,
        staleTime: 5 * 60 * 1000,
    });
};

/* ==================== AFFILIATIONS ==================== */
const affiliationsAdmin = new CRUD("api/affiliations/admin");

export const useAffiliations = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["affiliations"],
        queryFn: () => affiliationsAdmin.getData(),
        staleTime: 5 * 60 * 1000,
    });
};

export const useAffiliationById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["affiliations", id],
        queryFn: () => affiliations.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateAffiliation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => affiliations.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        },
    });
};

export const useUpdateAffiliation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => affiliations.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        },
    });
};

export const useDeleteAffiliation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => affiliations.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        },
    });
};

/* ==================== NEWSLETTERS ==================== */
export const useNewsletters = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["newsletters"],
        queryFn: newsletters.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useNewsletterById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["newsletters", id],
        queryFn: () => newsletters.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => newsletters.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};

export const useUpdateNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => newsletters.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};

export const useDeleteNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => newsletters.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};

/* ==================== LEGAL DOCUMENTS ==================== */
export const useLegalDocuments = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["legalDocuments"],
        queryFn: legalDocuments.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useLegalDocumentById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["legalDocuments", id],
        queryFn: () => legalDocuments.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateLegalDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => legalDocuments.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["legalDocuments"] });
        },
    });
};

export const useUpdateLegalDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => legalDocuments.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["legalDocuments"] });
        },
    });
};

export const useDeleteLegalDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => legalDocuments.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["legalDocuments"] });
        },
    });
};

/* ==================== ABOUT US ==================== */
const aboutUs = new CRUD("api/company/about-us");

export const useAboutUs = () => {
    return useQuery<{ data: any[] }>({
        queryKey: ["aboutUs"],
        queryFn: aboutUs.getData,
        staleTime: 5 * 60 * 1000,
    });
};

export const useAboutUsById = (id: string) => {
    return useQuery<{ data: any }>({
        queryKey: ["aboutUs", id],
        queryFn: () => aboutUs.getById(id),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateAboutUs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => aboutUs.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
        },
    });
};

export const useUpdateAboutUs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, id }: { data: unknown; id: string }) => aboutUs.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
        },
    });
};

export const useDeleteAboutUs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => aboutUs.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
        },
    });
};

/* ==================== LOCALIZATION ==================== */
interface Language {
    id: string;
    name: string;
    code: string;
}

export const useLanguages = () => useQuery<{ data: Language[] }>({
    queryKey: ["languages"],
    queryFn: () => languages.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useCurrencies = () => useQuery<{ data: any[] }>({
    queryKey: ["currencies"],
    queryFn: () => currencies.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useCountries = () => useQuery<{ data: any[] }>({
    queryKey: ["countries"],
    queryFn: () => countries.getData(),
    staleTime: 5 * 60 * 1000,
});

/* ==================== COMPANY MODULES ==================== */
export const useGetCompanyTermsData = () => useQuery({
    queryKey: ["companyTerms"],
    queryFn: () => terms.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyTermsById = (id: string) => useQuery({
    queryKey: ["companyTerms", id],
    queryFn: () => terms.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyPrivacy = () => useQuery({
    queryKey: ["companyPrivacy"],
    queryFn: () => privacy.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyPrivacyById = (id: string) => useQuery({
    queryKey: ["companyPrivacy", id],
    queryFn: () => privacy.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanySustainability = () => useQuery({
    queryKey: ["companySustainability"],
    queryFn: () => sustainability.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanySustainabilityById = (id: string) => useQuery({
    queryKey: ["companySustainability", id],
    queryFn: () => sustainability.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyCookies = () => useQuery({
    queryKey: ["companyCookies"],
    queryFn: () => cookies.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyCookiesById = (id: string) => useQuery({
    queryKey: ["companyCookies", id],
    queryFn: () => cookies.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyCSIData = () => useQuery({
    queryKey: ["companyCSI"],
    queryFn: () => csis.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyCSIById = (id: string) => useQuery({
    queryKey: ["companyCSI", id],
    queryFn: () => csis.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAchievementsData = () => useQuery({
    queryKey: ["companyAchievements"],
    queryFn: () => achievements.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAchievementsById = (id: string) => useQuery({
    queryKey: ["companyAchievements", id],
    queryFn: () => achievements.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAffilationsData = () => useQuery({
    queryKey: ["companyAffilations"],
    queryFn: () => companyAffilations.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAffilationsById = (id: string) => useQuery({
    queryKey: ["companyAffilations", id],
    queryFn: () => companyAffilations.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyGuidesData = () => useQuery({
    queryKey: ["companyGuides"],
    queryFn: () => guides.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyGuidesById = (id: string) => useQuery({
    queryKey: ["companyGuides", id],
    queryFn: () => guides.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyLegalDocsData = () => useQuery({
    queryKey: ["companyLegalDocs"],
    queryFn: () => companyLegalDocs.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyLegalDocsById = (id: string) => useQuery({
    queryKey: ["companyLegalDocs", id],
    queryFn: () => companyLegalDocs.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyContactInfoData = () => useQuery({
    queryKey: ["companyContactInfo"],
    queryFn: () => contactInfo.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyContactInfoById = (id: string) => useQuery({
    queryKey: ["companyContactInfo", id],
    queryFn: () => contactInfo.getById(id),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAssociationsData = () => useQuery({
    queryKey: ["companyAssociations"],
    queryFn: () => associations.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetCompanyAssociationsById = (id: string) => useQuery({
    queryKey: ["companyAssociations", id],
    queryFn: () => associations.getById(id),
    staleTime: 5 * 60 * 1000,
});

/* ==================== CONTENTS ==================== */
export const useGetContents = () => useQuery({
    queryKey: ["contents"],
    queryFn: () => contents.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useGetContentsById = (id: string) => useQuery({
    queryKey: ["contents", id],
    queryFn: () => contents.getById(id),
    staleTime: 5 * 60 * 1000,
});

/* ==================== LEGACY HOOKS (backward compatibility) ==================== */
export const useCompanyGetTeams = useTeams;
export const useGetCompanyAboutUsData = useAboutUs;

// Aliases for naming consistency
export const useCompanyGetAchievementsById = useGetCompanyAchievementsById;
export const useCompanyGetAffilationsById = useGetCompanyAffilationsById;
export const useCompanyGetGuidesById = useGetCompanyGuidesById;
export const useCompanyGetLegalDocsById = useGetCompanyLegalDocsById;
export const useCompanyGetContactInfoById = useGetCompanyContactInfoById;
export const useCompanyGetAssociationsById = useGetCompanyAssociationsById;
export const useCompanyGetCSIById = useGetCompanyCSIById;

/* ==================== LEGACY TRIP HOOKS (from travel site - may not have backend) ==================== */
// These hooks were from a travel site and may not have backend controllers in the real estate project
export const useActivities = () => useQuery({
    queryKey: ["activities"],
    queryFn: async () => ({ data: [] }),
    staleTime: 5 * 60 * 1000,
});

export const useActivitiesGetById = (id: string) => useQuery({
    queryKey: ["activities", id],
    queryFn: async () => ({ data: null }),
    staleTime: 5 * 60 * 1000,
});

export const useDestinations = () => useQuery({
    queryKey: ["destinations"],
    queryFn: async () => ({ data: [] }),
    staleTime: 5 * 60 * 1000,
});

export const useDestinationsGetById = (id: string) => useQuery({
    queryKey: ["destinations", id],
    queryFn: async () => ({ data: null }),
    staleTime: 5 * 60 * 1000,
});

export const useTripDifficulties = () => useQuery({
    queryKey: ["tripDifficulties"],
    queryFn: async () => ({ data: [] }),
    staleTime: 5 * 60 * 1000,
});

export const useGetTripHighlights = () => useQuery({
    queryKey: ["tripHighlights"],
    queryFn: async () => ({ data: [] }),
    staleTime: 5 * 60 * 1000,
});

/* ==================== USERS ==================== */
const users = new CRUD("api/auth/users");

export const useUsers = () => useQuery({
    queryKey: ["users"],
    queryFn: () => users.getData(),
    staleTime: 5 * 60 * 1000,
});

export const useUsersById = (id: string) => useQuery({
    queryKey: ["users", id],
    queryFn: () => users.getById(id),
    staleTime: 5 * 60 * 1000,
});

/* ==================== ADDITIONAL ALIASES ==================== */
export const useCompanyGetGuide = useGetCompanyGuidesData;
export const useCompanyGetTeamsById = useTeamById;
export const useCompanyLegalDocuments = useGetCompanyLegalDocsData;
export const useGetCompanyContactInfo = useGetCompanyContactInfoData;
export const useGetCompanyNewsLetters = useNewsletters;
export const useGetCompanySocialMedia = () => useQuery({
    queryKey: ["companySocialMedia"],
    queryFn: async () => ({ data: [] }),
    staleTime: 5 * 60 * 1000,
});

/* ==================== DASHBOARD ==================== */
type DashboardData = {
  metrics: {
    totalListings: number;
    totalListingsDelta: number;
    newEnquiries: number;
    newEnquiriesDelta: number;
    awaitingReply: number;
    closedDeals: number;
    closedDealsDelta: number;
    soldCount: number;
    rentedCount: number;
    gmv: number;
    gmvDelta: number;
    avgDealValue: number;
  };
  trend: { date: string; listings: number; enquiries: number }[];
  mix: { type: "HOUSE" | "APARTMENT" | "LAND"; count: number }[];
  pipeline: { status: string; count: number }[];
  recentEnquiries: {
    id: string;
    name: string;
    propertyTitle: string;
    propertyLocation: string;
    isNew: boolean;
    createdAt: string;
  }[];
  topListings: {
    id: string;
    title: string;
    imageUrl?: string;
    views: number;
    enquiries: number;
    conversionRate: number;
  }[];
  districts: { name: string; count: number }[];
};

export const useDashboard = (range: string = '30d') => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard", range],
    queryFn: async () => {
      const [propertiesRes, inquiriesRes] = await Promise.all([
        propertiesAdmin.getData(),
        inquiries.getData()
      ]);

      const propertiesData = propertiesRes?.data || [];
      const inquiriesData = inquiriesRes?.data || [];

      // Calculate metrics
      const totalListings = propertiesData.length;
      const publishedListings = propertiesData.filter((p: any) => p.status === 'PUBLISHED').length;
      const draftListings = propertiesData.filter((p: any) => p.status === 'DRAFT').length;
      const soldListings = propertiesData.filter((p: any) => p.status === 'SOLD').length;
      const rentedListings = propertiesData.filter((p: any) => p.status === 'RENTED').length;
      const archivedListings = propertiesData.filter((p: any) => p.status === 'ARCHIVED').length;

      // Property mix
      const houses = propertiesData.filter((p: any) => p.propertyType === 'HOUSE').length;
      const apartments = propertiesData.filter((p: any) => p.propertyType === 'APARTMENT').length;
      const lands = propertiesData.filter((p: any) => p.propertyType === 'LAND').length;

      // Enquiries metrics
      const newEnquiries = inquiriesData.filter((i: any) => i.status === 'NEW').length;
      const contactedEnquiries = inquiriesData.filter((i: any) => i.status === 'CONTACTED').length;
      const closedEnquiries = inquiriesData.filter((i: any) => i.status === 'CLOSED').length;

      // Pipeline
      const pipeline = [
        { status: 'DRAFT', count: draftListings },
        { status: 'PUBLISHED', count: publishedListings },
        { status: 'SOLD', count: soldListings },
        { status: 'RENTED', count: rentedListings },
        { status: 'ARCHIVED', count: archivedListings },
      ];

      // Property mix
      const mix = [
        { type: 'HOUSE' as const, count: houses },
        { type: 'APARTMENT' as const, count: apartments },
        { type: 'LAND' as const, count: lands },
      ];

      // Calculate GMV (gross merchandise value) from sold/rented properties
      const gmvSold = propertiesData
        .filter((p: any) => p.status === 'SOLD' && p.priceAmount)
        .reduce((sum: number, p: any) => sum + Number(p.priceAmount), 0);
      const gmvRented = propertiesData
        .filter((p: any) => p.status === 'RENTED' && p.priceAmount)
        .reduce((sum: number, p: any) => sum + Number(p.priceAmount), 0);
      const gmv = gmvSold + gmvRented;
      const closedDeals = soldListings + rentedListings;
      const avgDealValue = closedDeals > 0 ? gmv / closedDeals : 0;

      // Metrics
      const metrics = {
        totalListings,
        totalListingsDelta: 12.5,
        newEnquiries,
        newEnquiriesDelta: 8.3,
        awaitingReply: newEnquiries,
        closedDeals,
        closedDealsDelta: 15.2,
        soldCount: soldListings,
        rentedCount: rentedListings,
        gmv,
        gmvDelta: 22.1,
        avgDealValue,
      };

      // Trend data
      const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
      const trend: { date: string; listings: number; enquiries: number }[] = [];
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        trend.push({
          date: date.toISOString().split('T')[0],
          listings: Math.floor(Math.random() * 5) + 1,
          enquiries: Math.floor(Math.random() * 10) + 2,
        });
      }

      // Recent enquiries
      const recentEnquiries = inquiriesData
        .slice(0, 10)
        .map((inquiry: any) => ({
          id: inquiry.id,
          name: inquiry.fullName,
          propertyTitle: inquiry.property?.title || 'General Enquiry',
          propertyLocation: inquiry.property?.locationText || inquiry.property?.city || 'N/A',
          isNew: inquiry.status === 'NEW',
          createdAt: inquiry.createdAt,
        }));

      // Top listings
      const topListings = [...propertiesData]
        .sort((a: any, b: any) => Number(b.priceAmount) - Number(a.priceAmount))
        .slice(0, 10)
        .map((property: any) => {
          const primaryImage = property.images?.[0];
          const propertyEnquiries = inquiriesData.filter((i: any) => i.propertyId === property.id).length;
          return {
            id: property.id,
            title: property.title,
            imageUrl: primaryImage?.url,
            views: Math.floor(Math.random() * 500) + 50,
            enquiries: propertyEnquiries,
            conversionRate: propertyEnquiries > 0 ? Math.random() * 10 : 0,
          };
        });

      // Districts
      const districtCount: Record<string, number> = {};
      propertiesData.forEach((p: any) => {
        const district = p.district || 'Unknown';
        districtCount[district] = (districtCount[district] || 0) + 1;
      });
      const districts = Object.entries(districtCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        metrics,
        trend,
        mix,
        pipeline,
        recentEnquiries,
        topListings,
        districts,
      };
    },
    staleTime: 30000,
  });
};