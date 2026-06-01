import { CreateCountryDto, UpdateCountryDto } from '../dto/country.dto';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
export declare class CountryController {
    private readonly countryService;
    private readonly stateService;
    constructor(countryService: CountryService, stateService: StateService);
    findAll(): Promise<import("src/utils/response.utils").ApiResponse<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isoCode: string;
        phoneCode: string;
        phoneLength: number;
        currency: string;
        flag: string | null;
    }[]>>;
    getStatesByCountry(countryId: string): Promise<import("src/utils/response.utils").ApiResponse<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        countryId: string;
    }[]>>;
    findById(id: string): Promise<import("src/utils/response.utils").ApiResponse<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isoCode: string;
        phoneCode: string;
        phoneLength: number;
        currency: string;
        flag: string | null;
    }>>;
    create(countryData: CreateCountryDto): Promise<import("src/utils/response.utils").ApiResponse<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isoCode: string;
        phoneCode: string;
        phoneLength: number;
        currency: string;
        flag: string | null;
    }>>;
    update(id: string, countryData: UpdateCountryDto): Promise<import("src/utils/response.utils").ApiResponse<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isoCode: string;
        phoneCode: string;
        phoneLength: number;
        currency: string;
        flag: string | null;
    }>>;
    delete(id: string): Promise<import("src/utils/response.utils").ApiResponse<boolean>>;
}
