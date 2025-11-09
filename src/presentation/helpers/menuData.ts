import { ROLES } from "@/domain/enums/Roles.enum";
import { LucideBoxes, LucideChartBar, LucideCircleDollarSign, LucideLayoutDashboard, LucideMonitor, LucideSettings } from "lucide-react";

export const menuData = [
        { label: 'POS', icon: LucideMonitor, action: '/pos', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Ventas', icon: LucideCircleDollarSign, action: '/sales', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Reportes', icon: LucideChartBar, action: '/reports', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        { label: 'Inventario', icon: LucideBoxes, action: '/kardex', role: [ROLES.EMPLOYER] },
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
        { label: 'Configuración', icon: LucideSettings, action: '/settings', role: [ROLES.EMPLOYER, ROLES.ADMINISTRATOR] },
        
    ]