"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFaqsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_faqs_dto_1 = require("./create-faqs.dto");
class UpdateFaqsDto extends (0, mapped_types_1.PartialType)(create_faqs_dto_1.CreateFaqDto) {
}
exports.UpdateFaqsDto = UpdateFaqsDto;
//# sourceMappingURL=update-faqs.dto.js.map