import { ROLES } from "@/domain/enums/Roles.enum";
import { LucideBoxes, LucideCircleDollarSign, LucideHome, LucideLayoutDashboard, LucideMonitor } from "lucide-react";

export const menuData = [
        { label: 'POS', icon: LucideMonitor, action: '/pos', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Ventas', icon: LucideCircleDollarSign, action: '/sales', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Kardex', icon: LucideBoxes, action: '/kardex', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
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