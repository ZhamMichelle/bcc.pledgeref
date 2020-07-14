import service from "./Service";
import { strict } from 'assert';

export class AnalysisElements{
        id?: number;
        cityCodeKATO?: number;
        city?: string;
        sectorCode?: string;
        sector?: number; 
        relativityLocation?: string;
        sectorDescription?: string;
        typeEstateCode?: string;
        typeEstateByRef?: string;
        typeEstate?: string;
        apartmentLayoutCode?: string;
        apartmentLayout?: string;
        wallMaterialCode?: number; 
        wallMaterial?: string;
        detailAreaCode?: string;
        detailArea?: string;
        minCostPerSQM?: number; 
        maxCostPerSQM?: number; 
        corridor?: number;
        minCostWithBargain?: number; 
        maxCostWithBargain?: number; 
        beginDate?: Date;
        endDate?: Date;
}

export enum FormState {
    CREATE,
    EDIT,
    READ
  }

  export class Element {
    params: AnalysisElements[] = [new AnalysisElements()];
  }

export class City{
city?: string = "Актау";
}

export class ListService {
    getList(city:City){
        return service.getRestClient().post('/temporary/', city, { responseType: [] as AnalysisElements[] });
    }
}

export class UploadService {
    getList(body:FormData){
        return service.getRestClient().post('/upload/', body, { responseType: String });
    }
}

export class SearchService {
    getBySearch(city:City, sector:number){
        return service.getRestClient().get(`/temporary/search/?city=${city.city}&sector=${sector}`, {responseType: [] as AnalysisElements[]});
    }
}

export class DeleteService {
    deleteElement(id:number){
        return service.getRestClient().delete(`/temporary/${id}`);
    }
}