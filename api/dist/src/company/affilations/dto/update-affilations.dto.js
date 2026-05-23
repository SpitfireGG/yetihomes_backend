"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAffilationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_affilations_dto_1 = require("./create-affilations.dto");
class UpdateAffilationDto extends (0, mapped_types_1.PartialType)(create_affilations_dto_1.CreateAffiliationDto) {
}
exports.UpdateAffilationDto = UpdateAffilationDto;
//# sourceMappingURL=update-affilations.dto.js.map