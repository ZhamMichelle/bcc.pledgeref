import service from "./Service";
import { server } from "./server";

const webConfigEnv = (window as any).env;

export class AnalysisElements{
        id?: number;
        cityCodeKATO?: string;
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

export class City{
city?: string = "Актау";
}


export class Services {
    async getList(city:string): Promise<AnalysisElements[]> {
      return server.get(`/temporary/city/?city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }
  

    async postExcel(body:FormData): Promise<string> {
      return server.post('/upload/', body, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearch(city:string, sector:number): Promise<AnalysisElements[]> {
      return server.get(`/temporary/search/?city=${city}&sector=${sector}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async deleteElement(id:number): Promise<void> {
      return server.delete(`/temporary/${id}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

   async getIdElement(id:number): Promise<AnalysisElements>{
        return server.get(`/temporary/${id}`, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }

   async postElement(element:AnalysisElements): Promise<void>{
        return server.post(`/temporary/`, element, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }


   async putElement(element:AnalysisElements): Promise<void>{
        return server.put(`/temporary/`, element, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }


    async getKatoCityCode(city:string): Promise<string>{
return server.get(`/reference/api/kato/children/city/?city=${city}`, {
    baseURL: webConfigEnv.KATO,
})
    }

}