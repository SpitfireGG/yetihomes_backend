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
exports.CompayInfoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CompayInfoService = class CompayInfoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCompanyInfoDto) {
        return this.prisma.companyInfo.create({
            data: createCompanyInfoDto,
        });
    }
    async findAll() {
        return this.prisma.companyInfo.findMany();
    }
    async findOne(id) {
        const companyInfo = await this.prisma.companyInfo.findUnique({
            where: { id },
        });
        if (!companyInfo) {
            throw new common_1.NotFoundException(`company information not found with id -> ${id}`);
        }
        return companyInfo;
    }
    async update(id, updateCompanyInfoDto) {
        await this.findOne(id);
        return this.prisma.companyInfo.update({
            where: { id },
            data: updateCompanyInfoDto,
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.companyInfo.delete({
            where: { id },
        });
    }
};
exports.CompayInfoService = CompayInfoService;
exports.CompayInfoService = CompayInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompayInfoService);
//# sourceMappingURL=about.service.js.map