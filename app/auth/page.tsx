"use client"
import EmployerSelector from "@/presentation/components/EmployerSelector/EmployerSelector";


export default function AuthPage() {

  const handlerEmploye = (employee: any) => {
    console.log("Empleado seleccionado:", employee);
  }


  return (
    <div className="flex-1 px-8">
      <EmployerSelector onSelect={handlerEmploye} />
      
    </div>
  );
}
