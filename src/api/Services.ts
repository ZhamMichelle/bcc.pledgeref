import { server } from "./server";
import service from "./Service";

const webConfigEnv = (window as any).env;

export class AnalysisElements {
  id?: number;
  code?: string;
  cityCodeKATO?: string;
  city?: string;
  sectorCode?: string;
  sector?: string;
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

export class PrimaryAnalysisElements {
  id?: number;
  code?: string;
  cityCodeKATO?: string;
  city?: string;
  rcNameCode?: number;
  rcName?: string;
  actualAdress?: string;
  finQualityLevelCode?: string;
  finQualityLevel?: string;
  minCostPerSQM?: number;
  maxCostPerSQM?: number;
  beginDate?: Date;
  endDate?: Date;
}
export class LoggingElements {
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
  rcNameCode?: number;
  rcName?: string;
  actualAdress?: string;
  finQualityLevelCode?: string;
  finQualityLevel?: string;
  type?: string;
}
export enum FormState {
  CREATE,
  EDIT,
  READ,
  ARCHANDNEW,
}

export class City {
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

export class Pos {
  name?: string;
  value?: string;
}

export class KatoModel {
  te?: string = "";
  ab?: string = "";
  cd?: string = "";
  ef?: string = "";
  hij?: string = "";
  index?: string = "";
  k?: string = "";
  kaz_name?: string = "";
  rus_name?: string = "";
  rus_name_prefix?: string = "";
}

export class KatoBaseModel {
  districts?: KatoModel[];
  cities?: KatoModel[];
  villages?: KatoModel[];
}

export class CodeValue {
  code?: string;
  value?: string;
}

export class Services {
  async getList(city: string): Promise<AnalysisElements[]> {
    return server.get(`/temporary/city/?city=${city}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getListPrimary(city: string): Promise<PrimaryAnalysisElements[]> {
    return server.get(`/primaryHousing/city/?city=${city}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }
  async postExcel(formData: FormData, username: string): Promise<string> {
    return server.post(`/upload/?username=${username}`, formData, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async postExcelPrimary(
    formData: FormData,
    username: string
  ): Promise<string> {
    return server.post(`/upload/primUpload/?username=${username}`, formData, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async postExcelCoordinates(
    formData: FormData,
    username: string
  ): Promise<string> {
    let reference: string = "Test";
    return server.post(
      `/coordinates/upload/${reference}&?username=${username}`,
      formData,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async getBySearchSector(
    city: string,
    sector: number
  ): Promise<AnalysisElements[]> {
    return server.get(
      `/temporary/search/sector/?city=${city}&sector=${sector}`,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async getBySearchCode(
    actionType: string,
    code: number,
    status: any
  ): Promise<LoggingElements[]> {
    return server.get(
      `/logging/search/?actionType=${
        actionType != undefined ? actionType : ""
      }&code=${code != undefined ? code : ""}&status=${status}`,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async getLogPage(
    page: number,
    size: number,
    code: string,
    status: any,
    city: string,
    housingType: string
  ): Promise<PaginationParams> {
    return server.get(
      `/logging/${page}/${size}/?status=${status}&code=${code}&city=${city}&type=${housingType}`,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async getSector(
    point: string,
    city: string,
    typeLocCity: string
  ): Promise<string> {
    return server.get(`/coordinates/${city}/${point}/${typeLocCity}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getBySearchEstate(
    city: string,
    sector: string,
    estate: string
  ): Promise<AnalysisElements[]> {
    //sector>=0 ? sector=sector : sector=0;
    return server.get(
      `/temporary/search/?city=${city}&sector=${
        sector == undefined ? "" : sector
      }&estate=${
        estate == undefined
          ? ""
          : estate == "Тип недвижимости по справочнику"
          ? ""
          : estate
      }`,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async deleteElement(id: number, username: string): Promise<void> {
    return server.delete(`/temporary/${id}/?username=${username}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async deleteElementPrimary(id: number, username: string): Promise<void> {
    return server.delete(`/primaryHousing/${id}/?username=${username}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async deleteCity(city: string, username: string): Promise<string> {
    return server.delete(`/temporary/city/${city}/?username=${username}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async deleteCityPrimary(city: string, username: string): Promise<string> {
    return server.delete(`/primaryHousing/city/${city}/?username=${username}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getIdElement(id: number): Promise<AnalysisElements> {
    return server.get(`/temporary/${id}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getIdElementPrimary(id: number): Promise<PrimaryAnalysisElements> {
    return server.get(`/primaryHousing/${id}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async postElement(
    analysis: AnalysisElements,
    username: string
  ): Promise<void> {
    return server.post(`/temporary/?username=${username}`, analysis, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async postElementPrimary(
    analysis: AnalysisElements,
    username: string
  ): Promise<void> {
    return server.post(`/primaryHousing/?username=${username}`, analysis, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async putElement(
    analysis: AnalysisElements,
    username: string
  ): Promise<void> {
    return server.put(`/temporary/?username=${username}`, analysis, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async putElementPrimary(
    analysis: PrimaryAnalysisElements,
    username: string
  ): Promise<void> {
    return server.put(`/primaryHousing/?username=${username}`, analysis, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async archAndNewElement(
    analysis: AnalysisElements,
    username: string
  ): Promise<void> {
    return server.put(`/temporary/archandnew/?username=${username}`, analysis, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async archAndNewElementPrimary(
    analysis: AnalysisElements,
    username: string
  ): Promise<void> {
    return server.put(
      `/primaryHousing/archandnew/?username=${username}`,
      analysis,
      {
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
      }
    );
  }

  async getKatoCityCode(city: string): Promise<string> {
    return server.get(`/reference/api/kato/children/city/?city=${city}`, {
      baseURL: webConfigEnv.KATO,
    });
  }

  async getKatoRegion(): Promise<KatoModel[]> {
    return server.get(`/api/kato/regions`, {
      baseURL: webConfigEnv.KATO,
    });
  }

  async getKatoDistrict(regionCode: string): Promise<KatoBaseModel> {
    return server.get(`/api/kato/children/new/${regionCode}`, {
      baseURL: webConfigEnv.KATO,
    });
  }

  async getStreetType(): Promise<CodeValue[]> {
    return server.get(`/api/generic/StreetType`, {
      baseURL: webConfigEnv.KATO,
    });
  }

  async getExistCitiesCoordinates(): Promise<string[]> {
    return server.get(`/Coordinates/existCities`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getExistCitiesSecondaryHousing(): Promise<string[]> {
    return server.get(`/Temporary/existCities`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getExistCitiesLogging(): Promise<string[]> {
    return server.get(`/Logging/existCities`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getExistCitiesPrimaryHousing(): Promise<string[]> {
    return server.get(`/PrimaryHousing/existCities`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async getLogList(action: string): Promise<LoggingElements[]> {
    return server.get(`/logging/?action=${action}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async YandexApi(
    region: string,
    city: string,
    cityZone: string,
    streetType: string,
    housingEstate: string,
    streetTypeHE: string,
    street: string,
    house: any
  ): Promise<string> {
    const formatString = (title: string) => {
      return title.replace(/\ /g, "+");
    };
    return streetType != "жилой массив"
      ? server.get(
          cityZone == "" || cityZone == undefined || cityZone == null
            ? `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=страна+Казахстан,+${region}+область+${city}+${formatString(
                streetType
              )}+${formatString(street)},+${formatString(house)}`
            : `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=страна+Казахстан,+${region}+область+${city}+${formatString(
                cityZone
              )}+мкр,+${formatString(house)}`,
          {
            baseURL: "https://geocode-maps.yandex.ru/1.x",
          }
        )
      : server.get(
          cityZone == ""
            ? `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=страна+Казахстан,+${region}+область+${city}+${formatString(
                streetType
              )}+${formatString(housingEstate)},+${formatString(
                streetTypeHE
              )}+${formatString(street)},+${formatString(house)}`
            : `/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=страна+Казахстан,+${region}+область+${city},+${formatString(
                streetType
              )}+${formatString(housingEstate)},+${formatString(
                cityZone
              )}+мкр,+${formatString(house)}`,
          {
            baseURL: "https://geocode-maps.yandex.ru/1.x",
          }
        );
  }

  async DeleteSector(cityDelete: string, typeDelete: string): Promise<string> {
    return server.delete(`/coordinates/${cityDelete}/${typeDelete}`, {
      baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
    });
  }

  async Download() {
    return service
      .getRestClient()
      .get("/logging/download/", { responseType: "blob" });
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
