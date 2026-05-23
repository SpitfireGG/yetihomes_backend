"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AffiliationsService = class AffiliationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPublicAffiliations() {
        const affiliations = await this.prisma.affiliation.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: 'asc' },
        });
        return affiliations.map((partner) => ({
            src: partner.logoUrl,
            alt: partner.name,
        }));
    }
    async create(createAffiliationDto) {
        return this.prisma.affiliation.create({
            data: createAffiliationDto,
        });
    }
    async findAllAdmin() {
        return this.prisma.affiliation.findMany({
            orderBy: { displayOrder: 'asc' },
        });
    }
    async findOne(id) {
        const affiliation = await this.prisma.affiliation.findUnique({
            where: { id },
        });
        if (!affiliation)
            throw new common_1.NotFoundException(`Affiliation with ID ${id} not found`);
        return affiliation;
    }
    async update(id, updateAffiliationDto) {
        await this.findOne(id);
        return this.prisma.affiliation.update({
            where: { id },
            data: updateAffiliationDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.affiliation.delete({
            where: { id },
        });
    }
};
exports.AffiliationsService = AffiliationsService;
exports.AffiliationsService = AffiliationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AffiliationsService);
//# sourceMappingURL=affilation.service.js.map