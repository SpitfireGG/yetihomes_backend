"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLandDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_land_dto_1 = require("./create-land.dto");
class UpdateLandDto extends (0, mapped_types_1.PartialType)(create_land_dto_1.CreateLandDto) {
}
exports.UpdateLandDto = UpdateLandDto;
//# sourceMappingURL=update-land.dto.js.map