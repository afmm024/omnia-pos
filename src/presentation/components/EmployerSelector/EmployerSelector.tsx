import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
    onSelect: (employee: any) => void;
}

export default function EmployerSelector({ onSelect }: Props) {
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const employees = [
        {
            id: 1,
            name: "Guiselle Acuña",
            schedule: "6AM - 2PM",
            avatar: "GA",
            bgColor: "bg-pink-100",
            textColor: "text-pink-600"
        },
        {
            id: 2,
            name: "Prueba Andres",
            schedule: "11AM - 7PM",
            avatar: "PA",
            bgColor: "bg-blue-100",
            textColor: "text-blue-600"
        }
    ];


    const handleEmployeeSelect = (employee: any) => {
        setSelectedEmployee(employee);
        setIsDropdownOpen(false);
        onSelect(employee);
    };

    return (
        <div className="relative mb-6">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
                {selectedEmployee ? (
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${selectedEmployee.bgColor} ${selectedEmployee.textColor} flex items-center justify-center text-sm font-medium mr-3`}>
                            {selectedEmployee.avatar}
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">{selectedEmployee.name}</div>
                            <div className="text-xs text-gray-500">{selectedEmployee.schedule}</div>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-500">Seleccione un usuario</span>
                )}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {employees.map((employee) => (
                        <button
                            key={employee.id}
                            onClick={() => handleEmployeeSelect(employee)}
                            className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            <div className={`w-8 h-8 rounded-full ${employee.bgColor} ${employee.textColor} flex items-center justify-center text-sm font-medium mr-3`}>
                                {employee.avatar}
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-gray-900">{employee.name}</div>
                                <div className="text-xs text-gray-500">{employee.schedule}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}