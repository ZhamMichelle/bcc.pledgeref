import { server } from "./server";

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
}
export enum FormState {
    CREATE,
    EDIT,
    READ
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




export class Services {
    async getList(city:string): Promise<AnalysisElements[]> {
      return server.get(`/temporary/city/?city=${city}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async postExcel(formData:FormData, username: string): Promise<string> {
      return server.post(`/upload/?username=${username}`, formData, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearchSector(city:string, sector:number): Promise<AnalysisElements[]> {
      return server.get(`/temporary/search/sector/?city=${city}&sector=${sector}`, {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      });
    }

    async getBySearchCode(actionType:string, code:number): Promise<LoggingElements[]> {
      return server.get(`/logging/search/?actionType=${actionType}&code=${code!=undefined ? code : ''}`, {
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
}

export class LoginServer {
  async getLoginFromServer(usPar: UserParams): Promise<UserContext> {
    return server.token("/inline/api/auth/login", usPar, {
      baseURL: webConfigEnv.CAMUNDA_URL,
    });
  }
}