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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const create_support_dto_1 = require("./dto/create-support.dto");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    async createTicket(createTicketDto) {
        const ticket = await this.contactService.createSupportTicket(createTicketDto);
        return {
            success: true,
            message: 'Support ticket submitted successfully. We will be in touch soon!',
            data: ticket,
        };
    }
    getAllTickets() {
        return this.contactService.getAllTickets();
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)('ticket'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_support_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)('tickets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getAllTickets", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [support_service_1.ContactService])
], ContactController);
//# sourceMappingURL=support.controller.js.map