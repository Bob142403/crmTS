export default interface CreateClient {
  address: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  id?: number;
  company_id?: number;
}
