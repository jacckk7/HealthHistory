export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MedicalRecordList: undefined;
  MedicalRecordCreate: undefined;
  Medicine: undefined;
};

export type User = {
  id: number;
  email: string;
  nome: string;
  sexo: string;
  data_de_nascimento: Date;
};