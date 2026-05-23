"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reviews_dto_1 = require("./create-reviews.dto");
class UpdateReviewDto extends (0, mapped_types_1.PartialType)(create_reviews_dto_1.CreateReviewDto) {
}
exports.UpdateReviewDto = UpdateReviewDto;
//# sourceMappingURL=update-reviews.dto.js.map