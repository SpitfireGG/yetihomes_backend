"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLegalDocumentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_document_dto_1 = require("./create-document.dto");
class UpdateLegalDocumentDto extends (0, mapped_types_1.PartialType)(create_document_dto_1.CreateLegalDocumentDto) {
}
exports.UpdateLegalDocumentDto = UpdateLegalDocumentDto;
//# sourceMappingURL=update-document.dto.js.map