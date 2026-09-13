import { Controller, Get, HttpStatus, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { JwtAuthPayload } from '../auth/auth.interface';
import { ResponseUtil } from 'src/utils/response.utils';
import { ReportService } from './report.service';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('me')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Student attendance summary' })
  async mine(@Request() req: { user: JwtAuthPayload }) {
    const data = await this.reportService.myReport(req.user);
    return ResponseUtil.handleResponse(data, 'Report retrieved', HttpStatus.OK);
  }

  @Get('courses/:id')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Course attendance report' })
  async course(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.reportService.courseReport(id, req.user);
    return ResponseUtil.handleResponse(data, 'Report retrieved', HttpStatus.OK);
  }
}
