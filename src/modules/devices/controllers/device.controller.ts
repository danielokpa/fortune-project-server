// device.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Query,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DeviceService } from '../services/device.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import {
  CreateDeviceDto,
  UpdateDeviceDto,
  GetDevicesDto,
} from '../dto/device.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Devices')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Roles(UserType.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new device' })
  @ApiResponse({ status: 201, description: 'Device registered successfully' })
  @ApiResponse({ status: 500, description: 'Failed to create device' })
  async createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    const data = await this.deviceService.create(createDeviceDto);
    return ResponseUtil.handleResponse(
      data,
      'Device registered successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all devices' })
  @ApiResponse({ status: 200, description: 'Devices retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No devices found' })
  async getAll(@Query() query: GetDevicesDto) {
    const data = await this.deviceService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'Devices retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a device by ID' })
  @ApiResponse({ status: 200, description: 'Device retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async getDeviceById(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.deviceService.fetchDevice(id);
    return ResponseUtil.handleResponse(
      data,
      'Device retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update device status' })
  @ApiResponse({ status: 200, description: 'Device updated successfully' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async updateDevice(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    const data = await this.deviceService.update(id, updateDeviceDto);
    return ResponseUtil.handleResponse(
      data,
      'Device updated successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete device record' })
  @ApiResponse({ status: 200, description: 'Device deleted successfully' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async deleteDevice(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.deviceService.deleteDevice(id);
    return ResponseUtil.handleResponse(
      data,
      'Device deleted successfully',
      HttpStatus.OK,
    );
  }
}
