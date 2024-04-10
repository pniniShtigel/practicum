import { EmployeeRole } from "./employyRole";

export class Employee {
 
      public id: number=0
      public firstName: string=""
      public lastName: string=""
      public tz: string=""
      public email:string=""
      public startDate!:Date
      public birthDate!:Date
      public gender: boolean=true
      public roles:EmployeeRole[]=[]
      
    
  }