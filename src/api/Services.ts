import { server } from "./server";
import service from "./Service";

const webConfigEnv = (window as any).env;

export class AnalysisElements{
        id?: number;
        code?: string;
        cityCodeKATO?: string;
        city?: string;
        sectorCode?: string;
        sector?: number; 
        relativityLocation?: string;
        sectorDescription?: string;
        typeEstateCode?: string;
        typeEstateByRef?: string;
        apartmentLayoutCode?: string;
        apartmentLayout?: string;
        wallMaterialCode?: number; 
        wallMaterial?: string;
        detailAreaCode?: string;
        detailArea?: string;
        minCostPerSQM?: number; 
        maxCostPerSQM?: number; 
        bargain?: number;
        minCostWithBargain?: number; 
        maxCostWithBargain?: number; 
        beginDate?: Date;
        endDate?: Date;
}

export class PrimaryAnalysisElements{
  id?: number;
  code?: string;
  cityCodeKATO?: string;
  city?: string;
  rcNameCode?: number;
  rcName?: string;
  actualAdress?: string;
  FinQualityLevelCode?: string;
  FinQualityLevel?: string;
  minCostPerSQM?: number; 
  maxCostPerSQM?: number; 
  beginDate?: Date;
  endDate?: Date;
}
export class LoggingElements{
  id?: number;
  code?: string;
  cityCodeKATO?: string;
  city?: string;
  sectorCode?: string;
  sector?: number; 
  relativityLocation?: string;
  sectorDescription?: string;
  typeEstateCode?: string;
  typeEstateByRef?: string;
  apartmentLayoutCode?: string;
  apartmentLayout?: string;
  wallMaterialCode?: number; 
  wallMaterial?: string;
  detailAreaCode?: string;
  detailArea?: string;
  minCostPerSQM?: number; 
  maxCostPerSQM?: number; 
  bargain?: number;
  minCostWithBargain?: number; 
  maxCostWithBargain?: number; 
  beginDate?: Date;
  endDate?: Date;
  action?: string;
  username?: string;
  changeDate?: Date;
  isArch?: any;
}
export enum FormState {
    CREATE,
    EDIT,
    READ,
    ARCHANDNEW
  }

export class City{
city?: string = "Актау";
}
export class UserParams {
  username?: string;
  password?: string;
}

export class UserContext {
  token?: Token;
  user?: User;
}

// export class User {
//   avatar?: string;
//   login?: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   fullName?: string;
//   rolesString?: string[];
//   branch?: string;
//   depCode?: string;
//   title?: string;
// }
export class User {
  avatar?: string;
  login?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  roles?: UserRole[];
  rolesString?: string[];
  branch?: string;
  depCode?: string;
  title?: string;
  photo?: Photo;
}
export class Token {
  accessToken?: string;
  refreshToken?: string;
}

export class Photo {
  id?: string;
  name?: string;
  type?: string;
  data?: string;
}

export class UserRole {
  authority?: string;
  code?: string;
  description?: string;
  comments?: string;
  queues?: UserQueue[];
}

export class UserQueue {
  id: number = 0;
  name?: string;
  filter?: string;
  view?: string;
}

export class PaginationParams {
  results?: LoggingElements[];
  currentPage?: number;
  pageCount?: number;
  pageSize?: number;
  rowCount?: number;
  firstRowOnPage?: number;
  lastRowOnPage?: number;
}

export class Pos{
  name?: string;
  value?: string;
}


export class Services {
    async getList(city:string): Promise<AnalysisElements[]> {
      return server.get(`/temporary/city/?city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getListPrimary(city:string): Promise<PrimaryAnalysisElements[]> {
      return server.get(`/primaryHousing/city/?city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }
    async postExcel(formData:FormData, username: string): Promise<string> {
      return server.post(`/upload/?username=${username}`, formData, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async postExcelPrimary(formData:FormData, username: string): Promise<string> {
      return server.post(`/upload/primUpload/?username=${username}`, formData, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async postExcelCoordinates(formData:FormData, username: string): Promise<string> {
      let reference: string="Test";
      return server.post(`/coordinates/${reference}&?username=${username}`, formData, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearchSector(city:string, sector:number): Promise<AnalysisElements[]> {
      return server.get(`/temporary/search/sector/?city=${city}&sector=${sector}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearchCode(actionType:string, code:number, status:any): Promise<LoggingElements[]> {
      return server.get(`/logging/search/?actionType=${actionType!=undefined ? actionType : ''}&code=${code!=undefined ? code : ''}&status=${status}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getLogPage(page:number, size:number, code:string, status:any, city:string): Promise<PaginationParams> {
      return server.get(`/logging/${page}/${size}/?status=${status}&code=${code}&city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getSector(point:string, city:string, typeLocCity:string): Promise<string> {
      return server.get(`/coordinates/${city}/${point}/${typeLocCity}`,  {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearchEstate(city:string, sector:number, estate:string): Promise<AnalysisElements[]> {
      sector>=0 ? sector=sector : sector=0;
      return server.get(`/temporary/search/?city=${city}&sector=${sector==undefined ? '' : sector==0 ? '' : sector}&estate=${estate==undefined ? '' : estate=='Тип недвижимости по справочнику' ? '' : estate}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async deleteElement(id:number, username: string): Promise<void> {
      return server.delete(`/temporary/${id}/?username=${username}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async deleteCity(city:string, username: string): Promise<string> {
      return server.delete(`/temporary/city/${city}/?username=${username}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

   async getIdElement(id:number): Promise<AnalysisElements>{
        return server.get(`/temporary/${id}`, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }

    async getIdElementPrimary(id:number): Promise<AnalysisElements>{
      return server.get(`/primaryHousing/${id}`, {
          baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
  }

   async postElement(analysis:AnalysisElements, username: string): Promise<void>{
        return server.post(`/temporary/?username=${username}`, analysis, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }


   async putElement(analysis:AnalysisElements, username: string): Promise<void>{
        return server.put(`/temporary/?username=${username}`, analysis, {
            baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        });
    }

    async archAndNewElement(analysis:AnalysisElements, username: string): Promise<void>{
      return server.put(`/temporary/archandnew/?username=${username}`, analysis, {
          baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
  }

    async getKatoCityCode(city:string): Promise<string>{
return server.get(`/reference/api/kato/children/city/?city=${city}`, {
    baseURL: webConfigEnv.KATO,
})
    }

    async getLogList(action:string): Promise<LoggingElements[]> {
      return server.get(`/logging/?action=${action}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async YandexApi(typeLocCity:string, typeLocality:string, locality:string, city:string, typeStreet:string, street:string, house:any): Promise<string>{
    
     return   typeLocCity=="Город" ? server.get(typeStreet!='мкр' ? 
        `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Казахстан+${city}+${typeStreet}+${street}+${house}`
        :
        `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Казахстан+${city}+${street}+${typeStreet}+${house}`,
        {
        baseURL: "https://geocode-maps.yandex.ru/1.x"
      })
      :
      server.get(typeStreet!='мкр' ? 
        `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Казахстан+${typeLocality}+${locality}+${typeStreet}+${street}+${house}`
        :
        `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Казахстан+${typeLocality}+${locality}+${street}+${typeStreet}+${house}`,
        {
        baseURL: "https://geocode-maps.yandex.ru/1.x"
      })
    }

    async DeleteSector(cityDelete: string, typeDelete: string): Promise<string>{
        return server.delete(`/coordinates/${cityDelete}/${typeDelete}`,{
          baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        })
    }

    async Download() {
      return service.getRestClient()
        .get("/logging/download/",  { responseType: "blob" });
    }

    // async Download(): Promise<Blob> {
    //   return server.get(`/logging/download/`, {
    //     baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    //   });
    // }
   
}

export class LoginServer {
  async getLoginFromServer(usPar: UserParams): Promise<UserContext> {
    return server.token("/inline/api/auth/login", usPar, {
      baseURL: webConfigEnv.CAMUNDA_URL,
    });
  }
}