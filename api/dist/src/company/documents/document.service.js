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
exports.LegalDocumentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LegalDocumentService = class LegalDocumentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.legalDocument.findUnique({
            where: { type: dto.type },
        });
        if (existing) {
            throw new common_1.ConflictException(`A ${dto.type} document already exists. Please update it instead.`);
        }
        return this.prisma.legalDocument.create({ data: dto });
    }
    async findAll() {
        return this.prisma.legalDocument.findMany();
    }
    async findByType(type) {
        const document = await this.prisma.legalDocument.findUnique({
            where: { type },
        });
        if (!document) {
            throw new common_1.NotFoundException(`${type} document not found.`);
        }
        return document;
    }
    async update(id, dto) {
        const document = await this.prisma.legalDocument.findUnique({
            where: { id },
        });
        if (!document)
            throw new common_1.NotFoundException('Document not found');
        return this.prisma.legalDocument.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id) {
        const document = await this.prisma.legalDocument.findUnique({
            where: { id },
        });
        if (!document)
            throw new common_1.NotFoundException('Document not found');
        return this.prisma.legalDocument.delete({ where: { id } });
    }
};
exports.LegalDocumentService = LegalDocumentService;
exports.LegalDocumentService = LegalDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LegalDocumentService);
//# sourceMappingURL=document.service.js.map