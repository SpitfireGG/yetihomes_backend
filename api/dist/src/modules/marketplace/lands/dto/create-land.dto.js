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
exports.CreateLandDto = void 0;
const class_validator_1 = require("class-validator");
const base_property_dto_1 = require("../../dtos/base-property-dto");
const create_land_details_dto_1 = require("./create-land-details-dto");
const class_transformer_1 = require("class-transformer");
class CreateLandDto extends base_property_dto_1.BasePropertyDto {
    details;
}
exports.CreateLandDto = CreateLandDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_land_details_dto_1.CreateLandDetailsDto),
    __metadata("design:type", create_land_details_dto_1.CreateLandDetailsDto)
], CreateLandDto.prototype, "details", void 0);
//# sourceMappingURL=create-land.dto.js.map