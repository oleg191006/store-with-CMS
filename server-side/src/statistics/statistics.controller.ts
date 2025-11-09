import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main/:storeId')
  async getMainStatistics(@Param('storeId') storeId: string) {
    return this.statisticsService.getMainStatistics(storeId);
  }

  @Get('middle/:storeId')
  async getMiddleStatistics(@Param('storeId') storeId: string) {
    return this.statisticsService.getMiddleStatistics(storeId);
  }
}
