"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHouseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_houses_dto_1 = require("./create-houses.dto");
class UpdateHouseDto extends (0, mapped_types_1.PartialType)(create_houses_dto_1.CreateHouseDto) {
}
exports.UpdateHouseDto = UpdateHouseDto;
//# sourceMappingURL=update-house.dto.js.map