import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCountryDto, UpdateCountryDto } from '../dto/country.dto';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Countries retrieved successfully' })
  async findAll() {
    const data = await this.countryService.findAll();
    return ResponseUtil.handleResponse(
      data,
      'Countries retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id/states')
  @ApiOperation({ summary: 'Get all states for a country' })
  @ApiResponse({ status: 200, description: 'States retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async getStatesByCountry(@Param('id') countryId: string) {
    const data = await this.stateService.findByCountryId(countryId);
    return ResponseUtil.handleResponse(
      data,
      'States retrieved successfully',
      HttpStatus.OK,
    );
  }

  // @Get('states/:stateId/lgas')
  // @ApiOperation({ summary: 'Get all LGAs for a state' })
  // @ApiResponse({ status: 200, description: 'LGAs retrieved successfully' })
  // @ApiResponse({ status: 404, description: 'State not found' })
  // async getLgasByState(@Param('stateId') stateId: string) {
  //   const data = await this.lgaService.findByStateId(stateId);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'LGAs retrieved successfully',
  //     HttpStatus.OK,
  //   );
  // }

  @Get(':id')
  @Roles(
    UserType.ADMIN,
    UserType.USER,
  )
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get country by ID' })
  @ApiResponse({ status: 200, description: 'Country retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async findById(@Param('id') id: string) {
    const data = await this.countryService.findById(id);
    return ResponseUtil.handleResponse(
      data,
      'States retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserType.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new country' })
  @ApiResponse({ status: 201, description: 'Country created successfully' })
  async create(@Body() countryData: CreateCountryDto) {
    const data = await this.countryService.create(countryData);
    return ResponseUtil.handleResponse(
      data,
      'States retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Update country' })
  @ApiResponse({ status: 200, description: 'Country updated successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async update(
    @Param('id') id: string,
    @Body() countryData: UpdateCountryDto,
  ) {
    const data = await this.countryService.update(id, countryData);
    return ResponseUtil.handleResponse(
      data,
      'States retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Soft delete country' })
  @ApiResponse({ status: 200, description: 'Country deleted successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async delete(@Param('id') id: string) {
    const data = await this.countryService.delete(id);
    return ResponseUtil.handleResponse(
      data,
      'States retrieved successfully',
      HttpStatus.OK,
    );
  }
}
