import service from "./Service";
import { strict } from 'assert';

export class AnalysisElements{
        Id?: number;
        CityCodeKATO?: number;
        City?: string;
        SectorCode?: string;
        Sector?: number; 
        RelativityLocation?: string;
        SectorDescription?: string;
        TypeEstateCode?: string;
        TypeEstateByRef?: string;
        TypeEstate?: string;
        ApartmentLayoutCode?: string;
        ApartmentLayout?: string;
        WallMaterialCode?: number; 
        WallMaterial?: string;
        DetailAreaCode?: string;
        DetailArea?: string;
        MinCostPerSQM?: number; 
        MaxCostPerSQM?: number; 
        Corridor?: number;
        MinCostWithBargain?: number; 
        MaxCostWithBargain?: number; 
        BeginDate?: Date;
        EndDate?: Date;
}


export class City{
city?: string;
}

export class ListService {
    getList(city:City){
        return service.getRestClient().post('/temporary/', city, { responseType: [] as AnalysisElements[] });
    }
}