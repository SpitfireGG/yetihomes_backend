import { LandSubType, FacingDirection } from '@prisma/client';
export declare class CreateLandDetailsDto {
    subType: LandSubType;
    roadAccessFeet?: number;
    frontageFeet?: number;
    facingDirection?: FacingDirection;
    plotShape?: string;
    zoningType?: string;
    isCornerPlot?: boolean;
}
