import service from "./Service";
import { server } from "./server";

const webConfigEnv = (window as any).env;

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

// export class ListService {
//     getList(city:string){
//         return service.getRestClient().get(`/temporary/city/?city=${city}`, { responseType: [] as AnalysisElements[] });
//     }
// }

export class ListService {
    async getList(city:string): Promise<AnalysisElements[]> {
      return server.get(`/temporary/city/?city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }
  }

export class UploadService {
    getList(body:FormData){
        return service.getRestClient().post('/upload/', body, { responseType: String });
    }
}

export class SearchService {
    getBySearch(city:string, sector:number){
        return service.getRestClient().get(`/temporary/search/?city=${city}&sector=${sector}`, {responseType: [] as AnalysisElements[]});
    }
}

export class DeleteService {
    deleteElement(id:number){
        return service.getRestClient().delete(`/temporary/${id}`);
    }
}

export class GetIdService {
    getIdElement(id:number){
        return service.getRestClient().get(`/temporary/${id}`, {responseType: new AnalysisElements()});
    }
}

export class PostService {
    postElement(element:AnalysisElements){
        return service.getRestClient().post(`/temporary/`, element);
    }
}

export class PutService {
    putElement(element:AnalysisElements){
        return service.getRestClient().put(`/temporary/`, element);
    }
}