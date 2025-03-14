export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientCreate {
  name: string;
  salary: number;
  companyValuation: number;
}


export interface ApiResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export interface DialogData {
  isEditMode: boolean;
  client?: Client;
}




