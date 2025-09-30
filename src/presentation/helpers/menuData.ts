import { ROLES } from "@/domain/enums/Roles.enum";
import { LucideBoxes, LucideCircleDollarSign, LucideHome, LucideLayoutDashboard } from "lucide-react";

export const menuData = [
        { label: 'Inicio', icon: LucideHome, action: '/pos', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Ventas', icon: LucideCircleDollarSign, action: '/pos/sales', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Kardex', icon: LucideBoxes, action: '/pos/kardex', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        {
            label: 'Administración',
            icon: LucideLayoutDashboard,
            initiallyOpened: false,
            role:  [ROLES.ADMINISTRATOR],
            links: [
                { label: 'Productos', link: '/administrator/products', role: [ROLES.ADMINISTRATOR] },
                { label: 'Inventario', link: '/administrator/inventory', role: [ROLES.ADMINISTRATOR] },
            ],
        },
        
    ]