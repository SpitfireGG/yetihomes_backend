"use client";
import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextAreaInput, TextInput } from "@/components/common/Inputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { API_KEY, API_URL } from "@/utils/main";
import { CRUD } from "@/api/crud";
import { useAmenities } from "@/hooks/useTankstack-query";
import { Checkbox } from "@/components/ui/checkbox";
import { SeoMetadataForm } from "@/components/seo/seo-metadata-form";

const propertyCrud = new CRUD("api/properties");

const propertyTypes = [
  { value: "HOUSE", label: "House" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "LAND", label: "Land" },
];

const listingTypes = [
  { value: "SALE", label: "For Sale" },
  { value: "RENT", label: "For Rent" },
];

const pricePeriods = [
  { value: "TOTAL", label: "Total Price" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

const houseSubTypes = [
  { value: "BUNGALOW", label: "Bungalow" },
  { value: "VILLA", label: "Villa" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "TOWNHOUSE", label: "Townhouse" },
];

const apartmentSubTypes = [
  { value: "STUDIO", label: "Studio" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "PENTHOUSE", label: "Penthouse" },
  { value: "CONDO", label: "Condo" },
];

const landSubTypes = [
  { value: "RESIDENTIAL_PLOT", label: "Residential Plot" },
  { value: "COMMERCIAL_LAND", label: "Commercial Land" },
  { value: "AGRICULTURAL_LAND", label: "Agricultural Land" },
];

const areaUnits = [
  { value: "SQ_FT", label: "Sq Ft" },
  { value: "SQ_M", label: "Sq Meter" },
  { value: "AANA", label: "Aana" },
  { value: "ROPANI", label: "Ropani" },
];

const furnishingStatuses = [
  { value: "UNFURNISHED", label: "Unfurnished" },
  { value: "SEMI_FURNISHED", label: "Semi-Furnished" },
  { value: "FULLY_FURNISHED", label: "Fully Furnished" },
];

const facingDirections = [
  { value: "EAST", label: "East" },
  { value: "WEST", label: "West" },
  { value: "NORTH", label: "North" },
  { value: "SOUTH", label: "South" },
  { value: "NORTH_EAST", label: "North East" },
  { value: "NORTH_WEST", label: "North West" },
  { value: "SOUTH_EAST", label: "South East" },
  { value: "SOUTH_WEST", label: "South West" },
];

const currencies = [
  { value: "NPR", label: "NPR" },
  { value: "USD", label: "USD" },
];

const getVideoEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  if (url.includes("player.vimeo.com")) {
    return url;
  }
  return null;
};

export default function CreatePropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("HOUSE");
  const [listingType, setListingType] = useState<string>("SALE");
  const [images, setImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [seoData, setSeoData] = useState<any>({});
  const { data: amenitiesData } = useAmenities();
  const amenities = amenitiesData?.data || [];
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    locationText: "",
    district: "",
    city: "",
    latitude: 0,
    longitude: 0,
    priceAmount: 0,
    currency: "NPR",
    pricePeriod: "TOTAL",
    status: "DRAFT",
    isFeatured: false,
    badgeLabel: "",
    badgeTone: "NEUTRAL",
    areaValue: 0,
    areaUnit: "SQ_FT",
    titleStatus: "Clear Lal Purja",
    waterAvailability: "",
    electricity: "",
    isVerified: false,
    isOwnerApproved: false,
    videoUrl: "",
    mapIframe: "",
    houseDetails: {
      subType: "VILLA",
      usageType: "RESIDENTIAL",
      bedrooms: 0,
      bathrooms: 0,
      kitchens: 0,
      floors: 0,
      parkingSpaces: 0,
      furnishingStatus: "SEMI_FURNISHED",
      buildYear: 0,
    },
    apartmentDetails: {
      subType: "APARTMENT",
      bedrooms: 0,
      bathrooms: 0,
      balconies: 0,
      floorNumber: 0,
      totalFloors: 0,
      hasLift: false,
      hasParking: false,
      furnishingStatus: "SEMI_FURNISHED",
    },
    landDetails: {
      subType: "RESIDENTIAL_PLOT",
      roadAccessFeet: 0,
      frontageFeet: 0,
      facingDirection: "EAST",
      plotShape: "",
      zoningType: "",
      isCornerPlot: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const details =
        propertyType === "HOUSE"
          ? formData.houseDetails
          : propertyType === "APARTMENT"
            ? formData.apartmentDetails
            : formData.landDetails;

      const dataToSubmit = {
        ...formData,
        propertyType,
        listingType,
        priceAmount: Number(formData.priceAmount),
        areaValue: Number(formData.areaValue),
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        details,
        amenityIds: selectedAmenities,
        seo: seoData,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(dataToSubmit));

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const res = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to create property");
      }

      toast.success("Property created successfully");
      router.push("/properties");
    } catch (error: any) {
      toast.error(error.message || "Failed to create property");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="price">Price</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Listing Type</Label>
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {listingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  const newSlug = newTitle
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  setFormData({ ...formData, title: newTitle, slug: newSlug });
                }}
                placeholder="Property title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="property-url-slug"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <TextAreaInput
                label="Summary"
                name="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Short description..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <TextAreaInput
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Full description..."
                row={6}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isFeatured: checked })
                }
              />
              <Label>Featured Property</Label>
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location Text</Label>
              <Input
                value={formData.locationText}
                onChange={(e) =>
                  setFormData({ ...formData, locationText: e.target.value })
                }
                placeholder="Full address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Kathmandu"
              />
            </div>

            <div className="space-y-2">
              <Label>District</Label>
              <Input
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                placeholder="Lalitpur"
              />
            </div>

            {propertyType === "LAND" && (
              <div className="space-y-2">
                <Label>Facing Direction</Label>
                <Select
                  value={formData.landDetails?.facingDirection}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      landDetails: {
                        ...formData.landDetails,
                        facingDirection: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {facingDirections.map((dir) => (
                      <SelectItem key={dir.value} value={dir.value}>
                        {dir.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="price" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Price Amount</Label>
              <Input
                type="number"
                value={formData.priceAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceAmount: Number(e.target.value),
                  })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur.value} value={cur.value}>
                      {cur.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Price Period</Label>
              <Select
                value={formData.pricePeriod}
                onValueChange={(value) =>
                  setFormData({ ...formData, pricePeriod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pricePeriods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {propertyType !== "LAND" && (
              <>
                <div className="space-y-2">
                  <Label>Area Value</Label>
                  <Input
                    type="number"
                    value={formData.areaValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        areaValue: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Area Unit</Label>
                  <Select
                    value={formData.areaUnit}
                    onValueChange={(value) =>
                      setFormData({ ...formData, areaUnit: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {propertyType === "HOUSE" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>House Type</Label>
                <Select
                  value={formData.houseDetails?.subType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      houseDetails: {
                        ...formData.houseDetails,
                        subType: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {houseSubTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={formData.houseDetails?.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      houseDetails: {
                        ...formData.houseDetails,
                        bedrooms: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  value={formData.houseDetails?.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      houseDetails: {
                        ...formData.houseDetails,
                        bathrooms: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Parking Spaces</Label>
                <Input
                  type="number"
                  value={formData.houseDetails?.parkingSpaces}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      houseDetails: {
                        ...formData.houseDetails,
                        parkingSpaces: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Furnishing Status</Label>
                <Select
                  value={formData.houseDetails?.furnishingStatus}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      houseDetails: {
                        ...formData.houseDetails,
                        furnishingStatus: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {furnishingStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {(propertyType === "HOUSE" || propertyType === "APARTMENT") && amenities.length > 0 && (
            <div className="mt-6">
              <Label className="mb-2 block">Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-md border border-border/60 p-4">
                {amenities.map((amenity: any) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities([...selectedAmenities, amenity.id]);
                        } else {
                          setSelectedAmenities(selectedAmenities.filter(id => id !== amenity.id));
                        }
                      }}
                    />
                    <label
                      htmlFor={`amenity-${amenity.id}`}
                      className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {propertyType === "APARTMENT" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Apartment Type</Label>
                <Select
                  value={formData.apartmentDetails?.subType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      apartmentDetails: {
                        ...formData.apartmentDetails,
                        subType: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {apartmentSubTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={formData.apartmentDetails?.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apartmentDetails: {
                        ...formData.apartmentDetails,
                        bedrooms: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  value={formData.apartmentDetails?.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apartmentDetails: {
                        ...formData.apartmentDetails,
                        bathrooms: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Floor Number</Label>
                <Input
                  type="number"
                  value={formData.apartmentDetails?.floorNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apartmentDetails: {
                        ...formData.apartmentDetails,
                        floorNumber: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Furnishing Status</Label>
                <Select
                  value={formData.apartmentDetails?.furnishingStatus}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      apartmentDetails: {
                        ...formData.apartmentDetails,
                        furnishingStatus: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {furnishingStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {propertyType === "LAND" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Land Type</Label>
                <Select
                  value={formData.landDetails?.subType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      landDetails: { ...formData.landDetails, subType: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {landSubTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Road Access (feet)</Label>
                <Input
                  type="number"
                  value={formData.landDetails?.roadAccessFeet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      landDetails: {
                        ...formData.landDetails,
                        roadAccessFeet: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Frontage (feet)</Label>
                <Input
                  type="number"
                  value={formData.landDetails?.frontageFeet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      landDetails: {
                        ...formData.landDetails,
                        frontageFeet: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground">
                Paste a YouTube or video link
              </p>
            </div>

            <div className="space-y-2">
              <Label>Map Embed URL</Label>
              <Input
                value={formData.mapIframe}
                onChange={(e) =>
                  setFormData({ ...formData, mapIframe: e.target.value })
                }
                placeholder="https://www.google.com/maps/embed?..."
              />
              <p className="text-xs text-muted-foreground">
                Paste an iframe embed URL from Google Maps
              </p>
            </div>

            {formData.videoUrl && (
              <div className="space-y-2">
                <Label>Video Preview</Label>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/60 bg-muted/30">
                  {getVideoEmbedUrl(formData.videoUrl) ? (
                    <iframe
                      src={getVideoEmbedUrl(formData.videoUrl)}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      Invalid video URL
                    </div>
                  )}
                </div>
              </div>
            )}

            {formData.mapIframe && (
              <div className="space-y-2">
                <Label>Map Preview</Label>
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-border/60 bg-muted/30">
                  <iframe
                    src={formData.mapIframe}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <SeoMetadataForm seo={seoData} onChange={setSeoData} baseSlug={formData.slug} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
