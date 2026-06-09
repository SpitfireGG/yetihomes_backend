-- AlterEnum: add BIGHA, KATTHA, DHUR to AreaUnit
ALTER TABLE `Property` MODIFY COLUMN `areaUnit` ENUM('SQ_FT', 'SQ_M', 'AANA', 'ROPANI', 'BIGHA', 'KATTHA', 'DHUR') NULL;
